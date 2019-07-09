using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using EhliyetTurkiye.DrivingSchool.Entities;
using EhliyetTurkiye.DrivingSchool.Managers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using Volo.Abp;
using Volo.Abp.Application.Services;
using Volo.Abp.AutoMapper;
using Volo.Abp.Domain.Repositories;

namespace EhliyetTurkiye.DrivingSchool.Services.Courses
{
    [RemoteService]
    public class CourseCarAppService : ApplicationService, ICourseCarAppService
    {
        private readonly IRepository<CourseCar, int> _carRepository;
        private readonly ImageUploadManager _uploadManager;

        public CourseCarAppService(IRepository<CourseCar, int> carRepository, ImageUploadManager uploadManager)
        {
            _carRepository = carRepository;
            _uploadManager = uploadManager;
        }

        [HttpGet, Route("/api/app/getallcar/{courseId}")]
        public async Task<List<CourseCar>> GetListAsync(int courseId)
        {
            return await _carRepository.Where(p => p.CourseId == courseId).ToListAsync();
        }

        [HttpGet, Route("/api/app/getcar/{cid}/{carId}")]
        public async Task<CourseCar> GetAsync(int cid, int carId)
        {
            var car = await _carRepository.Where(p => p.CourseId == cid && p.Id == carId).FirstOrDefaultAsync();
            return car;
        }

        [HttpGet, Route("/api/app/deletecar/{cid}")]
        public async Task DeleteAsync(int cid)
        {
            await _carRepository.DeleteAsync(cid);
        }

        [HttpPost, Route("/api/app/updatecar")]
        public async Task UpdateAsync(CourseCar entity)
        {
            await _carRepository.UpdateAsync(entity);
        }

        [HttpPost]
        public async Task<bool> AddAsync([FromForm] CreateCourseCarDto dto)
        {
            if (dto.Image != null)
            {
                var fileName = dto.CarName.Trim().Replace(" ", "").TrimEnd().TrimStart().ToLower();

                var image = _uploadManager.AddImage(dto.Image, "carimages", $"{dto.CourseId}_{fileName}");
                if (image == "0") return false;
                dto.CarPhoto = image;
            }

            var ent = dto.MapTo<CourseCar>();
            await _carRepository.InsertAsync(ent);
            return true;
        }
    }
}