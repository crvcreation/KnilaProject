using System.ComponentModel.DataAnnotations;

namespace KnilaAPI.DTO
{
    public class LoginDTO
    {
        [Required]
        [EmailAddress]
        public string UserName { get; set; }
        [Required]

        public string Password { get; set; }
    }
}
