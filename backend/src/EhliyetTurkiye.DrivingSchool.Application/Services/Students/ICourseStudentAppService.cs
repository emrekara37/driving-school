using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace EhliyetTurkiye.DrivingSchool.Services.Students
{
    public interface ICourseStudentAppService : IAsyncCrudAppService<CourseStudentDto, Guid,
        PagedAndSortedResultRequestDto, CreateCourseStudentDto, CreateCourseStudentDto>
    {
    }
}