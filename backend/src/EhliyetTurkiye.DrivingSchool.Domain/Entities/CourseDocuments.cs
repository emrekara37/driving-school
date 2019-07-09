using System.ComponentModel.DataAnnotations.Schema;
using EhliyetTurkiye.DrivingSchool.Enums;
using Volo.Abp.Domain.Entities;

namespace EhliyetTurkiye.DrivingSchool.Entities
{
    public class CourseDocument : Entity<int>
    {
        public int CourseId { get; set; }
        [ForeignKey(nameof(CourseId))] public Course Course { get; set; }
        
        public string UserId { get; set; }
        
        public string Key { get; set; }
        
        public string FilePath { get; set; }
        public string Title { get; set; }
        public DocumentType DocumentType { get; set; }
        public bool IsSending { get; set; }
    }
}