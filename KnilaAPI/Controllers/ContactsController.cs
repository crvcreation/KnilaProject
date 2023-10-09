using KnilaAPI.DTO;
using KnilaAPI.Services;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;

namespace KnilaAPI.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ContactsController : ControllerBase
    {
        private readonly IContactService _contactServices;
        public ContactsController(IContactService contactServices)
        {
            _contactServices = contactServices;
        }

        [HttpGet("get-contacts")]
        public async Task<ActionResult> GetContact(int id)
        {
            return Ok(await _contactServices.GetContacts(id));
        }

        [HttpPost("save-contacts")]
        public async Task<ActionResult> SaveContact(ContactDTO request)
        {
            return Ok(await _contactServices.SaveContacts(request));
        }

        [HttpPost("delete-contacts")]
        public async Task<ActionResult> DeleteContact(int id)
        {
            return Ok(await _contactServices.DeleteContacts(id));
        }



        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<ActionResult> Login(LoginDTO reqLogin)
        {
            return Ok(await _contactServices.Login(reqLogin));
        }
        [HttpPost("logout")]
        public async Task<ActionResult> Logout()
        {
            return Ok(await _contactServices.Logout());
        }
        [HttpPost("refresh-token")]
        [AllowAnonymous]
        public async Task<ActionResult> RefreshToken(TokenDTO req)
        {
            return Ok(await _contactServices.RefershToken(req));
        }

        [HttpPost("register-user")]
        public async Task<ActionResult> SaveUser(UserDTO req)
        {
            return Ok(await _contactServices.SaveUser(req));
        }
    }

}
