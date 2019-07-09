using EhliyetTurkiye.DrivingSchool.Entities;
using EhliyetTurkiye.DrivingSchool.Enums;
using Volo.Abp.Application.Dtos;
using Volo.Abp.AutoMapper;

namespace EhliyetTurkiye.DrivingSchool.Services.Documents
{
    [AutoMapFrom(typeof(CourseDocument))]
    public class CourseDocumentDto : EntityDto<int>
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