using EhliyetTurkiye.DrivingSchool.Entities;
using EhliyetTurkiye.DrivingSchool.Enums;
using EhliyetTurkiye.DrivingSchool.Services.Calendars;
using Volo.Abp.AutoMapper;

namespace EhliyetTurkiye.DrivingSchool.Services.Documents
{
    [AutoMapTo(typeof(CourseDocument))]
    [AutoMapFrom(typeof(CourseDocumentDto))]
    public class CreateCourseDocumentDto
    {
        public int CourseId { get; set; }

        public string UserId { get; set; }

        public string Key { get; set; }

        public string FilePath { get; set; }
        public string Title { get; set; }
        public DocumentType DocumentType { get; set; }
        public bool IsSending { get; set; }
    }
}