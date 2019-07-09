using System.Collections.Generic;
using System.Threading.Tasks;
using EhliyetTurkiye.DrivingSchool.Entities.ClientEntities;
using EhliyetTurkiye.DrivingSchool.Enums;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace EhliyetTurkiye.DrivingSchool.Services.PreReg
{
    public interface IPreRegistrationAppService : IApplicationService
    {
        Task<List<PreRegistration>> GetPreRegs(int courseId);

        Task<List<PreRegistrationDto>> GetWaitingPreRegs(int courseId);
        Task<PreRegistration> ChangePreRegs(CreatePreRegistrationDto dto);
    }
}