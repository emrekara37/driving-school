using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;
using EhliyetTurkiye.DrivingSchool.Entities;
using EhliyetTurkiye.DrivingSchool.Entities.ClientEntities;
using EhliyetTurkiye.DrivingSchool.Managers.NotManager;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.AutoMapper;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Users;

namespace EhliyetTurkiye.DrivingSchool.Services.Calendars
{
    public class CourseCalendarAppService : AsyncCrudAppService<CourseCalendar, CourseCalendarDto, int,
        PagedAndSortedResultRequestDto, CreateCourseCalendarDto, CreateCourseCalendarDto>
    {
        private readonly IRepository<CourseCalendar, int> _repository;
        private readonly IRepository<Course, int> _courses;
        private readonly ISmsNotificationManager _smsNotificationManager;

        public CourseCalendarAppService(IRepository<CourseCalendar, int> repository,
            ISmsNotificationManager smsNotificationManager, IRepository<Course, int> courses) : base(repository)
        {
            _repository = repository;
            _smsNotificationManager = smsNotificationManager;
            _courses = courses;
        }


        [HttpPost]
        public override async Task<CourseCalendarDto> CreateAsync([FromBody] CreateCourseCalendarDto input)
        {
            var result = await base.CreateAsync(input);
            var courseName = await _courses.Where(p => p.Id == input.CourseId).Select(p => p.CourseName)
                .FirstOrDefaultAsync();
            var msg =$"{input.Title} {input.StartDate} , {input.EndDate} aralığında sürücü kursumuza bekleniyorsunuz. {courseName}";
           _smsNotificationManager.SendSms(new SmsSendingModel
           {
               Message = msg,
               PhoneNumber = input.PhoneNumber
           });
           
            return result;
        }


        [HttpGet]
        [Route("/api/app/courseCalendar/getlist/{courseId}")]
        public async Task<List<CourseCalendarDto>> GetCourseCalendars(int courseId)
        {
            var list = await _repository.Where(p => p.CourseId == courseId).ToListAsync();
            var map = list.MapTo<List<CourseCalendarDto>>();
            return map;
        }

        [HttpGet]
        [Route("/api/app/courseCalendar/gettoday/{courseId}")]
        public async Task<List<CourseCalendarDto>> GetToday(int courseId)
        {
            var date = DateTime.Now.ToString("MM dd yyyy");
            var calendars = await _repository.Where(p => p.CourseId == courseId && p.StartDate.Contains(date))
                .ToListAsync();
//            var result = new List<CourseCalendarDto>();
//            foreach (var item in calendars)
//            {
//                var userIds = item.UserId.Split(",");
//                foreach (var userId in userIds)
//                {
//                    var user = await _userRepository.FirstOrDefaultAsync(p => p.Id == userId);
//                    result.
//                }
//            }
            return calendars.MapTo<List<CourseCalendarDto>>();
        }
    }
}