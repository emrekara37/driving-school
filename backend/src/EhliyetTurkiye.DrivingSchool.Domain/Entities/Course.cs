using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Identity;

namespace EhliyetTurkiye.DrivingSchool.Entities
{
    public class Course : Entity<int>
    {
        public int CityId { get; set; }
        public int CountyId { get; set; }
        public string Address { get; set; }
        public string Logo { get; set; }
        public string CourseName { get; set; }
        public string PhoneNumber { get; set; }
        public string PersonelPhoneNumber { get; set; }
        public string FaxNumber { get; set; }

        public int ViewCount { get; set; }
        
        public string TaxNumber { get; set; }
        [ForeignKey(nameof(IdentityUserId))] public IdentityUser IdentityUser { get; set; }
        public Guid IdentityUserId { get; set; }
    }
}