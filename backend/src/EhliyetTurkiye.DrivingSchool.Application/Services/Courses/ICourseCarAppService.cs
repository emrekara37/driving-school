using System.Collections.Generic;
using System.Threading.Tasks;
using EhliyetTurkiye.DrivingSchool.Entities;
using Volo.Abp.Application.Services;

namespace EhliyetTurkiye.DrivingSchool.Services.Courses
{
    public interface ICourseCarAppService : IApplicationService
    {
        Task<List<CourseCar>> GetListAsync(int courseId);
        Task<CourseCar> GetAsync(int cid, int carId);
        Task DeleteAsync(int cid);
        Task UpdateAsync(CourseCar entity);
        Task<bool> AddAsync(CreateCourseCarDto dto);
    }
}