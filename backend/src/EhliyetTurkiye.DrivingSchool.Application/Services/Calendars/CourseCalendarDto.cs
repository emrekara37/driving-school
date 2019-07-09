using System.Collections.Generic;
using EhliyetTurkiye.DrivingSchool.Entities;
using EhliyetTurkiye.DrivingSchool.Entities.ClientEntities;
using EhliyetTurkiye.DrivingSchool.Services.ClientUsers;
using Volo.Abp.Application.Dtos;
using Volo.Abp.AutoMapper;

namespace EhliyetTurkiye.DrivingSchool.Services.Calendars
{
    [AutoMapFrom(typeof(CourseCalendar))]
    public class CourseCalendarDto : EntityDto<int>
    {
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string UserId { get; set; }
        public int CourseId { get; set; }
        public List<CourseUsersDto> Users { get; set; }
    }
}