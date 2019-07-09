using System;
using System.ComponentModel.DataAnnotations.Schema;
using EhliyetTurkiye.DrivingSchool.Entities;
using EhliyetTurkiye.DrivingSchool.Enums;
using Volo.Abp.Application.Dtos;
using Volo.Abp.AutoMapper;

namespace EhliyetTurkiye.DrivingSchool.Services.Payments
{
    [AutoMapTo(typeof(PaymentScheduler))]
    [AutoMapFrom(typeof(PaymentSchedulerDto))]
    public class CreatePaymentSchedulerDto
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

        [ForeignKey(nameof(CourseId))] public virtual Course Course { get; set; }
        public int CourseId { get; set; }
    }

public class CoursePaymentDto : EntityDto<int>
    {
        public PaymentType Type { get; set; }
        public int CourseId { get; set; }
        public string UserId { get; set; }
        public DateTime CreatedDate { get; set; }
        public decimal TotalPrice { get; set; }
        public string Description { get; set; }
        public int InstallmentCount { get; set; }
        public int PaymentDate { get; set; }
        
    }
}