using System.ComponentModel.DataAnnotations;

namespace EhliyetTurkiye.DrivingSchool.Dtos
{
    public class LoginModelDto
    {

        [Required(ErrorMessage = "{0} alanı gereklidir")]
        public string UserName { get; set; }
        [Required(ErrorMessage = "{0} alanı gereklidir")]
        public string Password { get; set; }
        
    }
}