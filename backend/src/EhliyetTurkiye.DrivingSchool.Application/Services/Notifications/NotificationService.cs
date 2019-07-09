using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EhliyetTurkiye.DrivingSchool.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace EhliyetTurkiye.DrivingSchool.Services.Notifications
{
    public class NotificationService :
        AsyncCrudAppService<Notification, NotificationDto, int, PagedAndSortedResultRequestDto, CreateNotificationDto,
            CreateNotificationDto>, INotificationAppService
    {
        private readonly IRepository<Notification, int> _notifications;

        public NotificationService(IRepository<Notification, int> repository) : base(repository)
        {
            _notifications = repository;
        }

        public async Task<List<Notification>> GetUnreadsAsync(int courseId)
        {
            var unreadeds = await _notifications.Where(p => p.IsReaded == false).ToListAsync();
            return unreadeds;
        }

        [HttpGet]
        public async Task<Notification> ReadAsync(int notificatonId)
        {
            var notification = await _notifications.FirstOrDefaultAsync(p => p.Id == notificatonId);
            notification.ReadedDate = DateTime.Now;
            notification.IsReaded = true;
            await _notifications.UpdateAsync(notification);
            return notification;
        }

        [HttpGet]
        public async Task<List<Notification>> ListAsync(int courseId)
        {
            var list = await _notifications.Where(p => p.CourseId == courseId).OrderByDescending(p => p.CreatedDate)
                .ToListAsync();
            return list;
        }
    }
}