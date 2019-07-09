using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace EhliyetTurkiye.DrivingSchool.Services.Payments
{
    public interface IPaymentSchedulerAppService : IAsyncCrudAppService<PaymentSchedulerDto, int,
        PagedAndSortedResultRequestDto, CreatePaymentSchedulerDto, CreatePaymentSchedulerDto>
    {
        
    }
}