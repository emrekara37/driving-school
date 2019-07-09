using EhliyetTurkiye.DrivingSchool.Entities;
using Volo.Abp.Application.Dtos;
using Volo.Abp.AutoMapper;

namespace EhliyetTurkiye.DrivingSchool.Services.Notifications
{
    [AutoMapFrom(typeof(Notification))]
    public class NotificationDto : EntityDto<int>
    {
    }

    [AutoMapTo(typeof(Notification))]
    [AutoMapFrom(typeof(NotificationDto))]
    public class CreateNotificationDto
    {
    }
}