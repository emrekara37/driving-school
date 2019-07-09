using System;
using EhliyetTurkiye.DrivingSchool.Entities;
using Microsoft.AspNetCore.Http;
using Volo.Abp.AutoMapper;

namespace EhliyetTurkiye.DrivingSchool.Services.Courses
{
    [AutoMapTo(typeof(CourseCar))]
    public class CreateCourseCarDto
    {
        public IFormFile Image { get; set; }
        public string CarPhoto { get; set; }
        public string CarName { get; set; }
        public string CarDescription { get; set; }
        public int CourseId { get; set; }
    }

    [AutoMapTo(typeof(Course))]
    public class CreateCourseDto
    {
        public int Id { get; set; }
        public IFormFile Image { get; set; }
        public string Address { get; set; }
        public string Logo { get; set; }
        public string CourseName { get; set; }
        public string PhoneNumber { get; set; }
        public string PersonelPhoneNumber { get; set; }
        public string FaxNumber { get; set; }
        public string TaxNumber { get; set; }
        public string IdentityUserId { get; set; }
    }
}