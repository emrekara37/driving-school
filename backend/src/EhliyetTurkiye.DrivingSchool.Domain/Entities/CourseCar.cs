using System.ComponentModel.DataAnnotations.Schema;
using Volo.Abp.Domain.Entities;

namespace EhliyetTurkiye.DrivingSchool.Entities
{
    public class CourseCar : Entity<int>
    {
        
        public string CarPhoto { get; set; }
        public string CarName { get; set; }
        public string CarDescription { get; set; }
        public int CourseId { get; set; }
        [ForeignKey(nameof(CourseId))] public Course Course { get; set; }
    }
}