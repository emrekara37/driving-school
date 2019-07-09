using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace EhliyetTurkiye.DrivingSchool.Services.Features
{
    public interface ICourseFeatureAppService : IAsyncCrudAppService<CourseFeatureDto, int,
        PagedAndSortedResultRequestDto, CreateCourseFeatureDto, CreateCourseFeatureDto>
    {
        Task<CourseFeatureDto> UpdateFeature(CourseFeatureDto feature);
    }
}