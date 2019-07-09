using System;
using System.ComponentModel.DataAnnotations.Schema;
using EhliyetTurkiye.DrivingSchool.Enums;
using Volo.Abp.Domain.Entities;

namespace EhliyetTurkiye.DrivingSchool.Entities.ClientEntities
{
    public class PreRegistration :  Entity<int>
    {
        public int CourseId { get; set; }
        public PreRegistrationType Type { get; set; }
        public DateTime CreatedDate { get; set; }
        
        
        
        public int? ProductId { get; set; }
        [ForeignKey(nameof(ProductId))]
        public virtual Product Product { get; set; }
        public string EtUserId { get; set; }
        [ForeignKey(nameof(EtUserId))]
        public virtual EtUser EtUser { get; set; }

    }
}