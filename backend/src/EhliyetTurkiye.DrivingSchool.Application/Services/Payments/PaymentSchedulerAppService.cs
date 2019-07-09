using EhliyetTurkiye.DrivingSchool.Entities;
using EhliyetTurkiye.DrivingSchool.Entities.ClientEntities;
using EhliyetTurkiye.DrivingSchool.Services.Courses;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace EhliyetTurkiye.DrivingSchool.Services.Payments
{
    public class  PaymentSchedulerAppService: AsyncCrudAppService<PaymentScheduler,PaymentSchedulerDto,int,PagedAndSortedResultRequestDto,CreatePaymentSchedulerDto,CreatePaymentSchedulerDto>

    {
        private readonly IRepository<PaymentScheduler, int> _repository;
        public PaymentSchedulerAppService(IRepository<PaymentScheduler, int> repository) : base(repository)
        {
            _repository = repository;
        }
    }
}