using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace EhliyetTurkiye.DrivingSchool.Services.Calendars
{
    public interface ICourseCalendarAppService : IAsyncCrudAppService<CourseCalendarDto, int,
        PagedAndSortedResultRequestDto, CreateCourseCalendarDto, CreateCourseCalendarDto>
    {
    }
}