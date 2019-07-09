using System;
using EhliyetTurkiye.DrivingSchool.Entities;
using Volo.Abp.Application.Dtos;
using Volo.Abp.AutoMapper;

namespace EhliyetTurkiye.DrivingSchool.Services.Payments
{
    [AutoMapFrom(typeof(PaymentScheduler))]
    public class PaymentSchedulerDto: EntityDto<int>
    {
        
        public string UserId { get; set; }
        public DateTime PaymentDate { get; set; }
        public bool IsPaid { get; set; }
        public int InstallmentCount { get; set; }
        public string InstallmentFee { get; set; }
        public string TotalPayment { get; set; }
        public string RemainingPayment { get; set; }
        public DateTime RegisterDate { get; set; }
        public int Sequence { get; set; }
        
        public int CourseId { get; set; }
    }
}