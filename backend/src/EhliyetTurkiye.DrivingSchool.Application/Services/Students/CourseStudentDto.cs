using System;
using EhliyetTurkiye.DrivingSchool.Entities;
using Volo.Abp.Application.Dtos;
using Volo.Abp.AutoMapper;

namespace EhliyetTurkiye.DrivingSchool.Services.Students
{
    [AutoMapFrom(typeof(CourseStudent))]
    public class CourseStudentDto : EntityDto<Guid>
    {
        public string Name { get; set; }
        public string TcKn { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public int ProductId { get; set; }
        public DateTime RegisterDate { get; set; }
        public string Password { get; set; }
        public int CourseId { get; set; }
        public string Periot { get; set; }
    }
}