using System.Collections.Generic;
using System.Threading.Tasks;
using EhliyetTurkiye.DrivingSchool.Entities;
using Volo.Abp.Application.Services;

namespace EhliyetTurkiye.DrivingSchool.Services.Courses
{
    public interface ICourseAppService : IApplicationService
    {
        Task<int> GetCourseCarCountAsync(int courseId);

        Task<int> GetCourseId(string userId);
        Task<Course> CreateAsync(Course entity);
        Task<List<CourseImage>> GetCourseImages(int courseId);
        Task<Course> GetCourse(int courseId);
        Task<int> GetViewCountAsync(int courseId);
        Task<CreateCourseDto> SetCourse(CreateCourseDto dto);
    }
}