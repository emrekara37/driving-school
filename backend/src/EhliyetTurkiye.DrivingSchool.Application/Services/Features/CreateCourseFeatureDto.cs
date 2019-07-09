using EhliyetTurkiye.DrivingSchool.Entities;
using Volo.Abp.AutoMapper;

namespace EhliyetTurkiye.DrivingSchool.Services.Features
{
    [AutoMapTo(typeof(CourseFeature))]
    [AutoMapFrom(typeof(CourseFeatureDto))]
    public class CreateCourseFeatureDto
    {
        public int CourseId { get; set; }
        public string Key { get; set; }
        public string Value { get; set; }
    }
}