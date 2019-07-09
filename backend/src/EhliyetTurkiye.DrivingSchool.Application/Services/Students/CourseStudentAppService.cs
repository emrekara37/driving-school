using System;
using EhliyetTurkiye.DrivingSchool.Entities;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace EhliyetTurkiye.DrivingSchool.Services.Students
{
    public class CourseStudentAppService :
        AsyncCrudAppService<CourseStudent, CourseStudentDto, Guid, PagedAndSortedResultRequestDto,
            CreateCourseStudentDto, CreateCourseStudentDto>, ICourseStudentAppService
    {
        public CourseStudentAppService(IRepository<CourseStudent, Guid> repository) : base(repository)
        {
        }
    }
}