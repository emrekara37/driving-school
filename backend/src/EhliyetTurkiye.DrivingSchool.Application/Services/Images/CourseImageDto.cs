using EhliyetTurkiye.DrivingSchool.Entities;
using Volo.Abp.Application.Dtos;
using Volo.Abp.AutoMapper;

namespace EhliyetTurkiye.DrivingSchool.Services.Images
{
    [AutoMapFrom(typeof(CourseImage))]
    public class CourseImageDto : EntityDto<int>
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int Sequence { get; set; }
        public int CourseId { get; set; }
        public string ImagePath { get; set; }
    }
}