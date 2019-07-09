using EhliyetTurkiye.DrivingSchool.Entities;
using Volo.Abp.Application.Dtos;
using Volo.Abp.AutoMapper;

namespace EhliyetTurkiye.DrivingSchool.Services.Notes
{
    [AutoMapFrom(typeof(CourseNote))]
    public class CourseNoteDto : EntityDto<int>
    {
        public int CourseId { get; set; }
        public string Text { get; set; }
        public string Color { get; set; }
    }
}