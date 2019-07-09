using System.ComponentModel.DataAnnotations;

namespace EhliyetTurkiye.DrivingSchool.Enums
{
    public enum EtUserState 
    {
        [Display(Name="Seçiniz")]
        None = 0,
        [Display(Name = "Aktif")]
        Active = 1,
        [Display(Name = "Pasif")]
        Passive = 2,
        [Display(Name = "Kilitli")]
        Locked = 3,
        [Display(Name = "Banlı")]
        Banned = 4,
        [Display(Name = "Silinmiş")]
        Deleted = 5
    }
}