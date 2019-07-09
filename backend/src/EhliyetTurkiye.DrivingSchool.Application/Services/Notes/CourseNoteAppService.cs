using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EhliyetTurkiye.DrivingSchool.Entities;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.AutoMapper;
using Volo.Abp.Domain.Repositories;

namespace EhliyetTurkiye.DrivingSchool.Services.Notes
{
    
    
    [EnableCors("Allow")]
    public class CourseNoteAppService : AsyncCrudAppService<CourseNote, CourseNoteDto, int,
        PagedAndSortedResultRequestDto, CreateCourseNoteDto, CreateCourseNoteDto>, ICourseNoteAppService
    {
        private readonly IRepository<CourseNote, int> _repository;

        public CourseNoteAppService(IRepository<CourseNote, int> repository) : base(repository)
        {
            _repository = repository;
        }

        public async Task<List<CourseNoteDto>> GetNotes(int cid)
        {
            var list = await _repository.Where(p => p.CourseId == cid).ToListAsync();
            return list.MapTo<List<CourseNoteDto>>();
        }

        [HttpPost]
        public async Task<CourseNoteDto> UpdateNote(CourseNoteDto note)
        {

            var ent = note.MapTo<CourseNote>();
            await _repository.UpdateAsync(ent);
            return note;
        }
    }
}