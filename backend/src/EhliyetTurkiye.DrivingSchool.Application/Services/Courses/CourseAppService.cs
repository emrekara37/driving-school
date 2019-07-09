using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EhliyetTurkiye.DrivingSchool.Entities;
using EhliyetTurkiye.DrivingSchool.Managers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Volo.Abp;
using Volo.Abp.Application.Services;
using Volo.Abp.AutoMapper;
using Volo.Abp.Domain.Repositories;

namespace EhliyetTurkiye.DrivingSchool.Services.Courses

{
    [RemoteService]
    public class CourseAppService : ApplicationService, ICourseAppService
    {
        private readonly IRepository<CourseCar, int> _courseCars;
        private readonly IRepository<Course, int> _courses;
        private readonly ImageUploadManager _ımageUploadManager;
        private readonly IRepository<CourseImage, int> _courseImages;

        public CourseAppService(IRepository<CourseCar, int> courseCars, IRepository<Course, int> courses,
            IRepository<CourseImage, int> courseImages, ImageUploadManager ımageUploadManager)
        {
            _courseCars = courseCars;
            _courses = courses;
            _courseImages = courseImages;
            _ımageUploadManager = ımageUploadManager;
        }


        public async Task<int> GetViewCountAsync(int courseId)
        {
            return await _courses.Where(p => p.Id == courseId).Select(p => p.ViewCount).FirstOrDefaultAsync();
        }

        public async Task<int> GetCourseCarCountAsync(int courseId)
        {
            var count = await _courseCars.Where(p => p.CourseId == courseId).Select(p => p.CourseId).CountAsync();
            return count;
        }

        public async Task<int> GetCourseId(string userId)
        {
            var id = await _courses.Where(p => p.IdentityUserId == Guid.Parse(userId)).Select(p => p.Id)
                .FirstOrDefaultAsync();
            return id;
        }

        public async Task<Course> CreateAsync(Course entity)
        {
            return await _courses.InsertAsync(entity);
        }

        public async Task<List<CourseImage>> GetCourseImages(int courseId)
        {
            var list = await _courseImages.Where(p => p.CourseId == courseId).ToListAsync();
            return list;
        }

        public async Task<Course> GetCourse(int courseId)
        {
            var course = await _courses.GetAsync(courseId);
            return course;
        }

        [HttpPost]
        public async Task<CreateCourseDto> SetCourse([FromForm] CreateCourseDto dto)
        {
            var c = await _courses.Where(p => p.Id == dto.Id).Select(p => new {p.IdentityUserId, p.Logo})
                .FirstOrDefaultAsync();
            if (dto.Image != null)
            {
                var image = _ımageUploadManager.AddImage(dto.Image, "courseimages", fileName: dto.Id + "_logo");
                if (image == "") return dto;
                dto.Logo = image;
            }
            else
            {
                dto.Logo = c.Logo;
            }

            var ent = dto.MapTo<Course>();
            ent.IdentityUserId = c.IdentityUserId;
            await _courses.UpdateAsync(ent);
            return dto;
        }
    }
}