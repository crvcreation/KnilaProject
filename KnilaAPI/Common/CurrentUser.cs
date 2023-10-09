using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace KnilaAPI.Common
{
    public interface ICurrentUser
    {
        long Id { get; set; }

    }
    public class CurrentUser : ICurrentUser
    {
        private readonly IHttpContextAccessor httpContext;


        public CurrentUser(IHttpContextAccessor context)
        {
            this.httpContext = context;
            var identity = (ClaimsIdentity)context.HttpContext.User.Identity;
            IEnumerable<Claim> claims = identity.Claims;

            if (claims != null && claims.Count() > 0)
            {
                var _id = claims.Where(y => y.Type == ClaimTypes.Name)
                                .Select(x => x.Value).FirstOrDefault();
                this.Id = long.TryParse(_id, out long id) ? id : 0;
        
            }
        }

        public long Id { get; set; }

    }
}
