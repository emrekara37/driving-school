using System.ComponentModel.DataAnnotations;

namespace EhliyetTurkiye.DrivingSchool.Enums
{
    public enum PaymentStatus
    {
        None = 0,
        [Display(Name = "Ödeme Bekliyor")]
        PaymentWaiting = 1,
        [Display(Name = "Onaylandı")]
        AdminApproved = 2,
        [Display(Name = "Hata")]
        Fail = 3,
        [Display(Name = "Onay Bekliyor")]
        PaymentApproved = 4,
        [Display(Name = "İade Talebi")]
        ExtraditionReq = 5,
        [Display(Name = "İade Talebi Onaylandı")]
        ApprovedExtraditionReq = 6,
        [Display(Name = "İade Talebi Red")]
        RejectedExtraditionReq = 7
    }
}