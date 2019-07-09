using EhliyetTurkiye.DrivingSchool.Entities;
using Volo.Abp.AutoMapper;

namespace EhliyetTurkiye.DrivingSchool.Services.Calendars
{
    [AutoMapTo(typeof(CourseCalendar))]
    [AutoMapFrom(typeof(CourseCalendarDto))]
    public class CreateCourseCalendarDto
    {
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string UserId { get; set; }
        public int CourseId { get; set; }
        public string PhoneNumber { get; set; }
        
    }
}