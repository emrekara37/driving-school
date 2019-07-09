using System.Collections.Generic;
using System.Threading.Tasks;
using EhliyetTurkiye.DrivingSchool.Entities;
using EhliyetTurkiye.DrivingSchool.Entities.ClientEntities;
using Volo.Abp.Application.Services;

namespace EhliyetTurkiye.DrivingSchool.Services.ClientUsers
{
    public interface IClientUserAppService : IApplicationService
    {
        Task<List<CourseUsersDto>> GetCourseUsers(int courseId);
        Task<List<EtUser>> GetListAsync();
        Task<int> GetCourseUserCountAsync(int courseId);
        Task<List<CourseDocument>> GetUsereDocuments(string userId);
        Task<bool> DeprecateUser(string userId);
    }
}