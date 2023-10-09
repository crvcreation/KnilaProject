using KnilaAPI.DTO;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;
using KnilaAPI.DbAccess;
using KnilaAPI.DTO;
using KnilaAPI.Services;
using System;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using KnilaAPI.Common;

namespace KnilaAPI.Services
{
    public class ContactService : IContactService
    {
        private readonly KnilaDbContext _context;
        private readonly IConfiguration _config;
        private readonly ICurrentUser _user;
        public ContactService(KnilaDbContext context, IConfiguration config, ICurrentUser currentUser)
        {
            _context = context;
            _config = config;
            _user = currentUser;
        }

        public async Task<List<ContactDTO>> GetContacts(int id)
        {
            List<ContactDTO> contactDetails = new List<ContactDTO>();

            contactDetails = await (from C in _context.TblContacts
                                    join CO in _context.TblCountries on C.CountryId equals CO.CountryId
                                    join S in _context.TblStates on C.StateId equals S.StateId
                                    join CT in _context.TblCities on C.CityId equals CT.CityId
                                    where id == 0 || C.Id == id
                                    select new ContactDTO
                                    {
                                        ID = C.Id,
                                        FirstName = C.FirstName,
                                        LastName = C.LastName,
                                        Email = C.Email,
                                        PhoneNumber = C.PhoneNumber,
                                        Address = C.Address,
                                        City = C.CityId,
                                        State = S.StateId,
                                        Country = C.CountryId,
                                        PostalCode = C.PostalCode
                                    }).ToListAsync();
            return contactDetails;
        }
        public async Task<int> SaveContacts(ContactDTO request)
        {


            TblContact contact = new TblContact();
            contact.Id = request.ID;
            contact.FirstName = request.FirstName;
            contact.LastName = request.LastName;
            contact.Email = request.Email;
            contact.PhoneNumber = request.PhoneNumber;
            contact.Address = request.Address;
            contact.CityId = request.City;
            contact.StateId = request.State;
            contact.CountryId = request.Country;
            contact.PostalCode = request.PostalCode;


            if (request.ID > 0)
                _context.TblContacts.Update(contact);
            else
                await _context.TblContacts.AddAsync(contact);


            return await _context.SaveChangesAsync();
        }
        public async Task<int> DeleteContacts(int id)
        {
            var contact = await _context.TblContacts.Where(x => x.Id == id).FirstOrDefaultAsync();
            if (contact != null)
            {
                _context.TblContacts.Remove(contact);
                return await _context.SaveChangesAsync();
            }
            return 0;
        }



        public async Task<TokenDTO> Login(LoginDTO req)
        {
            TokenDTO token = new TokenDTO();


            var user = await _context.TblUsers.Where((x) => x.UsrName == req.UserName && x.UsrPassword == HashData(req.Password)).FirstOrDefaultAsync();

            if (user is null)
                throw new UnauthorizedAccessException();


            token = CreateToken(user.Id, user.FullName);

            int save = await SaveToken(token, Convert.ToInt32(user.Id));


            return token;
        }

        public async Task<int> Logout()
        {
            var user = await _context.TblAuthTokens.Where(x => x.Id == _user.Id).FirstOrDefaultAsync();
            if (user != null)
            {
                _context.TblAuthTokens.Remove(user);
                return await _context.SaveChangesAsync();
            }
            return 0;
        }

        public async Task<TokenDTO> RefershToken(TokenDTO req)
        {
            TokenDTO result = new TokenDTO();

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.ReadJwtToken(req.Token);

            if (token.ValidTo > DateTime.UtcNow)
                throw new Exception("Token not expired.");

            var userId = Convert.ToInt64(token.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name).Value);
            var fullName = token.Claims.FirstOrDefault(c => c.Type == ClaimTypes.GivenName).Value;


            if (await _context.TblAuthTokens.AnyAsync((x) => x.UsrId == userId && x.RefreshToken == req.RefreshToken && x.ExpDate > DateTime.Now))
            {
                result = CreateToken(userId, fullName);
                int save = await SaveToken(result, Convert.ToInt32(userId));

            }
            else
                throw new UnauthorizedAccessException("Token expired.");


            return result;
        }


        public async Task<int> SaveUser(UserDTO request)
        {

            TblUser user = new TblUser();
            user.FullName = request.FullName;
            user.UsrName = request.Email;
            user.UsrPassword = HashData(request.Password);

            await _context.TblUsers.AddAsync(user);
            return await _context.SaveChangesAsync();
        }

        //private methods
        private TokenDTO CreateToken(long UserId, string FullName)
        {
            var authClaims = new List<Claim>
                        {
                            new Claim(ClaimTypes.Name, UserId.ToString()),
                            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                            new Claim(ClaimTypes.GivenName, FullName),
                        };

            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:Secret"]));

            int.TryParse(_config["JWT:TokenValidityInMinutes"], out int tokenValidityInMinutes);

            var token = new JwtSecurityToken(
                issuer: _config["JWT:ValidIssuer"],
                audience: _config["JWT:ValidAudience"],
                expires: DateTime.UtcNow.AddMinutes(tokenValidityInMinutes),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );


            int.TryParse(_config["JWT:RefreshTokenValidityInDays"], out int refreshTokenValidityInDays);

            return new TokenDTO
            {
                RefreshToken = GenerateRefreshToken(),
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                ExpiryTime = DateTime.UtcNow.AddDays(refreshTokenValidityInDays),

            };
        }
        private async Task<int> SaveToken(TokenDTO token, int UserID)
        {
            var oldToken = await _context.TblAuthTokens.Where((x) => x.UsrId == UserID).FirstOrDefaultAsync();
            _context.TblAuthTokens.Remove(oldToken);

            TblAuthToken authToken = new TblAuthToken();
            authToken.UsrId = UserID;
            authToken.RefreshToken = token.RefreshToken;
            authToken.ExpDate = token.ExpiryTime;

            await _context.TblAuthTokens.AddAsync(authToken);
            return await _context.SaveChangesAsync();
        }
        private string GenerateRefreshToken()
        {
            var randomNumber = new byte[64];
            var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }


        private string HashData(string itemToBeHashed)
        {
            var HashedData = "";

            if (!string.IsNullOrEmpty(itemToBeHashed))
            {
                const int NumberOfIterations = 1000;
                HashedData = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                              password: itemToBeHashed,
                              salt: Convert.FromBase64String("ApGH9jN4u8tgqSt3ApVZ5pHYDJY6KjGt"),
                              prf: KeyDerivationPrf.HMACSHA512,
                              iterationCount: NumberOfIterations,
                              numBytesRequested: 256 / 8));
            }


            return HashedData;
        }


    }
}
