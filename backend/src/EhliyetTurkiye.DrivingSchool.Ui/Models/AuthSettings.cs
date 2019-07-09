using System.ComponentModel.DataAnnotations;

namespace EhliyetTurkiye.DrivingSchool.Ui.Models
{
    public static class AuthSettings
    {
        public static string ValidHttp { get; set; } = "http://ehliyetturkiye.com";
        public static string JwtKey { get; set; } = "MySuperSecureKey";
    }
    public class LoginModel
    {
        [Required(ErrorMessage = "Username is required")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }
    }
}