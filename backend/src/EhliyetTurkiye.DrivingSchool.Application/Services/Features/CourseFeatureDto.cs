using EhliyetTurkiye.DrivingSchool.Entities;
using Volo.Abp.Application.Dtos;
using Volo.Abp.AutoMapper;

namespace EhliyetTurkiye.DrivingSchool.Services.Features
{
    [AutoMapTo(typeof(CourseFeature))]
    public class CourseFeatureDto : EntityDto<int>
    {
        public int CourseId { get; set; }
        public string Key { get; set; }
        public string Value { get; set; }
    }
}