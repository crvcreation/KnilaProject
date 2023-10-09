using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using System;

namespace KnilaAPI.DTO
{
    public class TokenDTO
    {
        [Required]
        public string Token { get; set; }
        [Required]
        public string RefreshToken { get; set; }

        [JsonIgnore]
        public DateTime ExpiryTime { get; set; }
    }
}
