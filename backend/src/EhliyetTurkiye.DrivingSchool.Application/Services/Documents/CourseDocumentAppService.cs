using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EhliyetTurkiye.DrivingSchool.Entities;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.AutoMapper;
using Volo.Abp.Domain.Repositories;

namespace EhliyetTurkiye.DrivingSchool.Services.Documents
{
    public class CourseDocumentAppService : AsyncCrudAppService<CourseDocument, CourseDocumentDto, int,
        PagedAndSortedResultRequestDto, CreateCourseDocumentDto, CreateCourseDocumentDto>,ICourseDocumentAppService
    {
        private readonly IRepository<CourseDocument,int> _repository;
        
        public CourseDocumentAppService(IRepository<CourseDocument, int> repository) : base(repository)
        {
            _repository = repository;
        }

        public async Task<List<CourseDocumentDto>> GetUserDocuments(string userId)
        {
            var list = await _repository.Where(p => p.UserId == userId).ToListAsync();
            return list.MapTo<List<CourseDocumentDto>>();



        }
    }
}