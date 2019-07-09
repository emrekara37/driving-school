using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EhliyetTurkiye.DrivingSchool.Entities.ClientEntities;
using EhliyetTurkiye.DrivingSchool.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.AutoMapper;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Uow;

namespace EhliyetTurkiye.DrivingSchool.Services.PreReg
{
    public class PreRegistrationAppService : ApplicationService, IPreRegistrationAppService
    {
        private readonly IRepository<PreRegistration, int> _repository;
        private readonly IRepository<EtUser> _userRepository;

        public PreRegistrationAppService(IRepository<PreRegistration, int> repository,
            IRepository<EtUser> userRepository)
        {
            _repository = repository;
            _userRepository = userRepository;
        }


        public async Task<List<PreRegistration>> GetPreRegs(int courseId)
        {
            try
            {
                var ent = await _repository.Where(p => p.CourseId == courseId).Include(p => p.EtUser).ToListAsync();
                return ent;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }



        [HttpGet]
        public async Task<List<PreRegistrationDto>> GetWaitingPreRegs(int courseId)
        {
            var list = await _repository.Where(p => p.CourseId == courseId && p.Type == PreRegistrationType.Waiting).Include(p => p.EtUser)
                .ToListAsync();
            return list.MapTo<List<PreRegistrationDto>>();
        }


        [HttpPost, Route("/api/app/preRegistration/change")]
        [UnitOfWork]
        public async Task<PreRegistration> ChangePreRegs(CreatePreRegistrationDto dto)
        {
            try
            {
                var ent = await _repository.FirstOrDefaultAsync(p => p.Id == dto.Id);
                ent.Type = dto.Type;
                if (dto.Type == PreRegistrationType.Rejected)
                {
                    return await _repository.UpdateAsync(ent, true);
                }

                var user = await _userRepository.FirstOrDefaultAsync(p => p.Id == ent.EtUserId);
                user.CourseId = ent.CourseId;
                ent.ProductId = dto.ProductId;
                var ea = await _userRepository.UpdateAsync(user, true);
                var e = await _repository.UpdateAsync(ent, true);
                return e;
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception);
                throw;
            }
        }
    }
}