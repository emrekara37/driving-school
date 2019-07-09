using System;
using System.ComponentModel.DataAnnotations.Schema;
using EhliyetTurkiye.DrivingSchool.Entities.ClientEntities;
using Volo.Abp.Domain.Entities;

namespace EhliyetTurkiye.DrivingSchool.Entities
{
    public class CourseStudent : Entity<Guid>
    {
        public string Name { get; set; }
        public string TcKn { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public int ProductId { get; set; }
        [NotMapped] public virtual Product Product { get; set; }
        public DateTime RegisterDate { get; set; }
        public int CourseId { get; set; }
        [ForeignKey(nameof(CourseId))]
        public virtual Course Course { get; set; }

        public string Photo { get; set; }
        
        
        public string Periot { get; set; }
        
    }
}