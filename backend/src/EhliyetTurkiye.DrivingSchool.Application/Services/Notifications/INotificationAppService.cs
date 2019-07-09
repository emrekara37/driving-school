using System.Collections.Generic;
using System.Threading.Tasks;
using EhliyetTurkiye.DrivingSchool.Entities;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace EhliyetTurkiye.DrivingSchool.Services.Notifications
{
    public interface INotificationAppService : IAsyncCrudAppService<NotificationDto, int, PagedAndSortedResultRequestDto
        , CreateNotificationDto, CreateNotificationDto>
    {
        Task<List<Notification>> ListAsync(int courseId);
        Task<List<Notification>> GetUnreadsAsync(int courseId);
        Task<Notification> ReadAsync(int notificatonId);
    }
}