using System.Linq;
using System.Threading.Tasks;
using EhliyetTurkiye.DrivingSchool.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.AutoMapper;
using Volo.Abp.Domain.Repositories;

namespace EhliyetTurkiye.DrivingSchool.Services.Features
{
    public class CourseFeatureAppService : AsyncCrudAppService<CourseFeature, CourseFeatureDto, int,
        PagedAndSortedResultRequestDto, CreateCourseFeatureDto, CreateCourseFeatureDto>, ICourseFeatureAppService
    {
        private readonly IRepository<CourseFeature> _repository;

        public CourseFeatureAppService(IRepository<CourseFeature, int> repository) : base(repository)
        {
            _repository = repository;
        }

        [HttpGet]
        [Route("/api/app/courseFeature/getbykey/{key}/{courseId}")]
        public async Task<CourseFeatureDto> GetFeature(string key, int courseId)
        {
            var ent = await _repository.FirstOrDefaultAsync(p => p.Key == key && p.CourseId == courseId);
            if (ent == null)
            {
                return new CourseFeatureDto
                {
                    Id = 0
                };
            }

            var dto = ent.MapTo<CourseFeatureDto>();
            return dto;
        }

        [HttpPost]
        public async Task<CourseFeatureDto> UpdateFeature(CourseFeatureDto feature)
        {
            var ent = feature.MapTo<CourseFeature>();
            await _repository.UpdateAsync(ent);
            return feature;
        }
    }
    
}