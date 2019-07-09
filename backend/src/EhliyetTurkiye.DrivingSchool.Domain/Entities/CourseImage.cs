using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.Metadata.Ecma335;
using Volo.Abp.Domain.Entities;

namespace EhliyetTurkiye.DrivingSchool.Entities
{
    public class CourseImage : Entity<int>
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int Sequence { get; set; }
        public int CourseId { get; set; }
        [ForeignKey(nameof(CourseId))] public Course Course { get; set; }
        public string ImagePath { get; set; }
    }
}