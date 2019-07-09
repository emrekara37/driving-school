using System.Collections.Generic;
using System.Runtime.InteropServices;
using System.Security.Claims;
using System.Threading.Tasks;
using EhliyetTurkiye.DrivingSchool.Entities.ClientEntities;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace EhliyetTurkiye.DrivingSchool.Services
{
    public class PaymentAppService : ApplicationService, IPaymentAppService
    {
        private readonly IRepository<Payment> _repository;

        public PaymentAppService(IRepository<Payment> repository)
        {
            _repository = repository;
        }

        public async Task<List<Payment>> GetListAsync()
        {
            var list = await _repository.GetListAsync();
            return list;
        }
    }
}