using System.Collections.Generic;
using System.Threading.Tasks;
using EhliyetTurkiye.DrivingSchool.Entities.ClientEntities;
using Volo.Abp.Application.Services;

namespace EhliyetTurkiye.DrivingSchool.Services
{
    public interface IPaymentAppService : IApplicationService
    {
        Task<List<Payment>> GetListAsync();
    }
}