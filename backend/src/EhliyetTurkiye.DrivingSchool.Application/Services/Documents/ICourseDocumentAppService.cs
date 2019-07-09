using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace EhliyetTurkiye.DrivingSchool.Services.Documents
{
    public interface ICourseDocumentAppService : IAsyncCrudAppService<CourseDocumentDto, int,
        PagedAndSortedResultRequestDto, CreateCourseDocumentDto, CreateCourseDocumentDto>
    {
        Task<List<CourseDocumentDto>> GetUserDocuments(string userId);
    }
}