using System;
using System.ComponentModel.DataAnnotations.Schema;
using EhliyetTurkiye.DrivingSchool.Enums;
using Volo.Abp.Domain.Entities;

namespace EhliyetTurkiye.DrivingSchool.Entities
{
    public class PaymentScheduler : Entity<int>
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

    public class CoursePayment : Entity<int>
    {
        public PaymentType Type { get; set; }
        [ForeignKey(nameof(CourseId))] public virtual Course Course { get; set; }
        public int CourseId { get; set; }
        public string UserId { get; set; }
        public DateTime CreatedDate { get; set; }
        public decimal TotalPrice { get; set; }
    }

    public class CashPayment : Entity<int>
    {
        public string Description { get; set; }
        public decimal Payment { get; set; }
        public DateTime RegisterDate { get; set; }
        
        [ForeignKey(nameof(CoursePaymentId))]
        public virtual CoursePayment CoursePayment { get; set; }
        
        public int CoursePaymentId { get; set; }
        
    }

    public class BillPayment : Entity<int>
    {
     
        public DateTime PaymentDate { get; set; }
        public bool IsPaid { get; set; }
        public int InstallmentCount { get; set; }
        public decimal InstallmentFee { get; set; }
        public decimal RemainingPayment { get; set; }
        public DateTime RegisterDate { get; set; }
        public int Sequence { get; set; }
        [ForeignKey(nameof(CoursePaymentId))]
        public virtual CoursePayment CoursePayment { get; set; }
        public int CoursePaymentId { get; set; }
    }
    
}