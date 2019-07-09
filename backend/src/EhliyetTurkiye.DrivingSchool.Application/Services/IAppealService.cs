using System.Threading.Tasks;
using EhliyetTurkiye.DrivingSchool.Entities;
using EhliyetTurkiye.DrivingSchool.Enums;
using Volo.Abp;
using Volo.Abp.Application.Services;

namespace EhliyetTurkiye.DrivingSchool.Services
{
    [RemoteService(false)]
    public interface IAppealService : IApplicationService
    {
        Task<bool> CreateAsync(Appeal entity);
        Task<bool> ChangeState(int id, AppealStateType newState);
    }
}