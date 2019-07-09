using System.Threading.Tasks;
using EhliyetTurkiye.DrivingSchool.Entities;
using EhliyetTurkiye.DrivingSchool.Entities.ClientEntities;
using Volo.Abp.Application.Services;

namespace EhliyetTurkiye.DrivingSchool.Services.Payments
{
    public interface ICoursePaymentAppService : IApplicationService
    {

        Task<UserCoursePaymentResult> GetUserPayment(string userId);
        Task<CashPayment> AddCash(CoursePaymentDto entity);
        Task<BillPayment> AddBill(CoursePaymentDto dto);
        Task<Payment> AddOnline(CoursePaymentDto dto);
        Task<bool> PaidBill(int id);
        Task<int> GetCourseCountPayments(int id);
    }
}