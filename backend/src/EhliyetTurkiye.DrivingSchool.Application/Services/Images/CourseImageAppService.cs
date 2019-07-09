using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EhliyetTurkiye.DrivingSchool.Entities;
using EhliyetTurkiye.DrivingSchool.Managers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.AutoMapper;
using Volo.Abp.Domain.Repositories;

namespace EhliyetTurkiye.DrivingSchool.Services.Images
{
    public class CourseImageAppService : AsyncCrudAppService<CourseImage, CourseImageDto, int,
        PagedAndSortedResultRequestDto, CreateCourseImageDto, CreateCourseImageDto>, ICourseImageAppService
    {
        private readonly IRepository<CourseImage, int> _repository;
        private readonly ImageUploadManager _ımageUploadManager;

        public CourseImageAppService(IRepository<CourseImage, int> repository, ImageUploadManager ımageUploadManager) :
            base(repository)
        {
            _repository = repository;
            _ımageUploadManager = ımageUploadManager;
        }


        [HttpGet]
        [Route("/api/app/courseImage/getlist/{courseId}")]
        public async Task<List<CourseImageDto>> GetCourseImages(int courseId)
        {
            var list = await _repository.Where(p => p.CourseId == courseId).ToListAsync();
            var mappedList = list.MapTo<List<CourseImageDto>>();
            return mappedList;
        }


        [HttpPost, Route("/api/app/courseImage/add")]
        public async Task<ApiResponseModel> AddCourseImages([FromForm] CreateCourseImageDto dto)
        {
            var resp = new ApiResponseModel();
            try
            {
                if (dto.Image == null)
                {
                    resp.Errors.Add("Resim Boş");
                    resp.IsSuccess = false;
                    return resp;
                }

                dto.ImagePath = _ımageUploadManager.AddImage(dto.Image, "courseImages",
                    $"{dto.CourseId}_{GuidGenerator.Create().ToString()}");
                var ent = dto.MapTo<CourseImage>();
                await _repository.InsertAsync(ent);
                resp.Data = ent;
                resp.IsSuccess = true;
            }
            catch (Exception e)
            {
                resp.Errors.Add("Resim eklenirken bir hata oluştu");
                resp.IsSuccess = false;
            }

            return resp;
        }
    }
}