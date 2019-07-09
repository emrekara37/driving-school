using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using EhliyetTurkiye.DrivingSchool.Enums;
using Volo.Abp.Domain.Entities;

namespace EhliyetTurkiye.DrivingSchool.Entities.ClientEntities
{
    [Table("AspNetUsers")]
    public class EtUser : Entity<string>
    {
        public string FirstName { get; set; }

        public EtUserState State { get; set; }
        public string Photo { get; set; }
        
        public string Address { get; set; }
        public string Tckn { get; set; }


        public DateTime RegisterDate { get; set; }
        public int CourseId { get; set; }
        
        public string PhoneNumber { get; set; }
        public string Birthday { get; set; }
        public bool MailNotificationIsActive { get; set; }
        public string Email { get; set; }
    }
}