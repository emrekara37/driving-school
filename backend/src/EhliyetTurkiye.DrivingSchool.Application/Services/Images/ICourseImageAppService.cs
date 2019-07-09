using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace EhliyetTurkiye.DrivingSchool.Services.Images
{
    public interface ICourseImageAppService : IAsyncCrudAppService<CourseImageDto, int, PagedAndSortedResultRequestDto,
        CreateCourseImageDto, CreateCourseImageDto>
    {
        Task<List<CourseImageDto>> GetCourseImages(int courseId);
    }
}