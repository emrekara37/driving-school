using System;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using EhliyetTurkiye.DrivingSchool.Entities.ClientEntities;
using EhliyetTurkiye.DrivingSchool.Settings;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace EhliyetTurkiye.DrivingSchool.Services
{
    public interface ISettingsAppService : IApplicationService
    {
    }

    public interface IProductAppService : IApplicationService
    {
        Task<List<Product>> GetAll();
        List<object> GetPeriots();
    }

    public class ProductAppService : ApplicationService, IProductAppService
    {
        private readonly IRepository<Product> _repository;

        public ProductAppService(IRepository<Product> repository)
        {
            _repository = repository;
        }

        public async Task<List<Product>> GetAll()
        {
            return await _repository.GetListAsync();
        }

        public List<object> GetPeriots()
        {
            var date = DateTime.Now;
            var resp = new List<object>();
            var substr = DrivingSchoolSettings.Months.Split(',');
            var index = 1;
            foreach (var s in substr)
            {
                if (date.Month <= index)
                {
                    if (date.Month == index)
                    {
                        if (1 <= date.Day && date.Day < 8)
                        {
                            resp.Add(new {id = $"{index}_{date.Year}", value = $"{s} - {date.Year}"});
                        }
                    }
                    else
                    {
                        resp.Add(new {id = $"{index}_{date.Year}", value = $"{s} - {date.Year}"});
                    }
                }

                index++;
            }

            return resp;
        }
    }
}