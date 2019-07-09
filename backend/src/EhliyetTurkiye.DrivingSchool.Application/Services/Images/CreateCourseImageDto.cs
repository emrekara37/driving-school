using EhliyetTurkiye.DrivingSchool.Entities;
using Microsoft.AspNetCore.Http;
using Volo.Abp.AutoMapper;

namespace EhliyetTurkiye.DrivingSchool.Services.Images
{
    [AutoMapTo(typeof(CourseImage))]
    [AutoMapFrom(typeof(CourseImageDto))]
    public class CreateCourseImageDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int Sequence { get; set; }
        public int CourseId { get; set; }
        public IFormFile Image { get; set; }
        public string ImagePath { get; set; }
    }
}