using System;
using System.ComponentModel.DataAnnotations.Schema;
using Volo.Abp.Domain.Entities;

namespace EhliyetTurkiye.DrivingSchool.Entities
{
    public class Notification : Entity<int>
    {
        public int CourseId { get; set; }
        [ForeignKey(nameof(CourseId))] public Course Course { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ReadedDate { get; set; }
        public bool IsReaded { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
    }
}