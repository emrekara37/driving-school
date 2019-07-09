using System;
using System.ComponentModel.DataAnnotations.Schema;
using EhliyetTurkiye.DrivingSchool.Enums;
using Volo.Abp.Domain.Entities;

namespace EhliyetTurkiye.DrivingSchool.Entities.ClientEntities
{
    public class Payment : Entity<int>, IEntity
    {
        public string EtUserId { get; set; }
        [NotMapped]
        public virtual EtUser EtUser { get; set; }
        public DateTime CreatedTime { get; set; }
        public decimal PaymentAmount { get; set; }
        public string MerchantOid { get; set; }
        public PaymentStatus Status { get; set; }
        public int CityId { get; set; }
        [NotMapped]
        public virtual City City { get; set; }
        public int CountyId { get; set; }
        [NotMapped]
        public virtual County County { get; set; }
        public string Period { get; set; }
        [NotMapped]
        public virtual PaymentInformation PaymentInformation { get; set; }

        public int CourseId { get; set; }

        public int CoursePaymentId { get; set; }
        
        

        public string Description { get; set; }
    }
}
