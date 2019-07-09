using System;
using System.Threading.Tasks;
using EhliyetTurkiye.DrivingSchool.Entities;
using EhliyetTurkiye.DrivingSchool.Enums;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace EhliyetTurkiye.DrivingSchool.Services
{
    public class AppealService : ApplicationService, IAppealService
    {
        private readonly IRepository<Appeal, int> _appealRepository;

        public AppealService(IRepository<Appeal, int> appealRepository)
        {
            _appealRepository = appealRepository;
        }

        public async Task<bool> CreateAsync(Appeal entity)
        {
            var result = await _appealRepository.InsertAsync(entity);
            return result.Id > 0;
        }

        public async Task<bool> ChangeState(int id, AppealStateType newState)
        {
            var appeal = await _appealRepository.GetAsync(id, false);
            appeal.AppealStateType = newState;
            var result = await _appealRepository.UpdateAsync(appeal);
            return result.AppealStateType == newState;
        }
    }
}