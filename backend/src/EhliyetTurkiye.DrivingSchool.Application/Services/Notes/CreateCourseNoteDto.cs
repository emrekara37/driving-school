using EhliyetTurkiye.DrivingSchool.Entities;
using Volo.Abp.AutoMapper;

namespace EhliyetTurkiye.DrivingSchool.Services.Notes
{
    [AutoMapTo(typeof(CourseNote))]
    [AutoMapFrom(typeof(CourseNoteDto))]
    public class CreateCourseNoteDto
    {
        public int CourseId { get; set; }
        public string Text { get; set; }
        public string Color { get; set; }
    }
}