using System.ComponentModel.DataAnnotations.Schema;
using Volo.Abp.Domain.Entities;

namespace EhliyetTurkiye.DrivingSchool.Entities.ClientEntities
{
    public class PaymentInformation : Entity<int>, IEntity
    {
        public string FailedReasonMsg { get; set; }
        public string FailedReasonCode { get; set; }
        public string UserIp { get; set; }
        public decimal AfterPaymentAmount { get; set; }
        public string PaymentType { get; set; }
        public string PaymentResult { get; set; }
        public string Description { get; set; }
        public string Currency { get; set; }
        public int PaymentId { get; set; }
        [ForeignKey(nameof(PaymentId))]
        public Payment Payment { get; set; }
        public int ProductId { get; set; }
        [ForeignKey(nameof(ProductId))]
        public virtual Product Product { get; set; }

        public int InstallmentCount { get; set; }

        public string TcKn { get; set; }

    }
}