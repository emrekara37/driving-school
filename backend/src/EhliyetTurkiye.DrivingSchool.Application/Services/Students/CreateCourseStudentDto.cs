using System;
using EhliyetTurkiye.DrivingSchool.Entities;
using Volo.Abp.AutoMapper;

namespace EhliyetTurkiye.DrivingSchool.Services.Students
{
    [AutoMapTo(typeof(CourseStudent))]
    [AutoMapFrom(typeof(CourseStudentDto))]
    public class CreateCourseStudentDto
    {
        public string Name { get; set; }
        public string TcKn { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public int ProductId { get; set; }
        public DateTime RegisterDate { get; set; } = DateTime.Now;
        public int CourseId { get; set; }
        public string Periot { get; set; }
        public string Photo { get; set; } = "https://i.hizliresim.com/Rrqnn1.png";
    }
}