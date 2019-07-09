using System.ComponentModel.DataAnnotations.Schema;
using Volo.Abp.Domain.Entities;

namespace EhliyetTurkiye.DrivingSchool.Entities
{
    public class CourseFeature : Entity<int>
    {
        public int CourseId { get; set; }
        [ForeignKey(nameof(CourseId))] public Course Course { get; set; }
        public string Key { get; set; }
        public string Value { get; set; }
    }
}