using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace EhliyetTurkiye.DrivingSchool.Services.Notes
{
    public interface ICourseNoteAppService : IAsyncCrudAppService<CourseNoteDto, int, PagedAndSortedResultRequestDto,
        CreateCourseNoteDto, CreateCourseNoteDto>
    {
        Task<List<CourseNoteDto>> GetNotes(int cid);
        Task<CourseNoteDto> UpdateNote(CourseNoteDto note);
    }
}