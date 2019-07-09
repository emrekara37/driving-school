using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;
using EhliyetTurkiye.DrivingSchool.Entities;
using EhliyetTurkiye.DrivingSchool.Entities.ClientEntities;
using EhliyetTurkiye.DrivingSchool.Services.Documents;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Identity;
using Volo.Abp.Users;

namespace EhliyetTurkiye.DrivingSchool.Services.ClientUsers
{
    public class ClientUserAppService : ApplicationService, IClientUserAppService
    {
        private readonly IRepository<EtUser> _clientUserRepository;
        private readonly IRepository<PreRegistration> _preRegistrationsRepository;
        private readonly IRepository<DeprecatedUser, int> _deprecatedUserRepository;
        private readonly IRepository<CourseDocument, int> _courseDocuments;
        private readonly IRepository<CourseStudent> _courseStudentsRepository;
        private readonly IRepository<Product> _productRepository;
        

        public ClientUserAppService(IRepository<EtUser> clientUserRepository,
            IRepository<CourseStudent> courseStudentsRepository,
            IRepository<Product> productRepository, IRepository<PreRegistration> preRegistrationsRepository,
            IRepository<DeprecatedUser, int> deprecatedUserRepository, IRepository<CourseDocument, int> courseDocuments)
        {
            _clientUserRepository = clientUserRepository;
            _courseStudentsRepository = courseStudentsRepository;
            _productRepository = productRepository;
            _preRegistrationsRepository = preRegistrationsRepository;
            _deprecatedUserRepository = deprecatedUserRepository;
            _courseDocuments = courseDocuments;
        }

        [HttpGet, Route("/api/app/client/getlist")]
        public async Task<List<EtUser>> GetListAsync()
        {
            var list = await _clientUserRepository.GetListAsync();
            return list;
        }

        public async Task<int> GetCourseUserCountAsync(int courseId)
        {
            var clientUserCount = await _clientUserRepository.CountAsync(p => p.CourseId == courseId);
            var studentUserCount = await _courseStudentsRepository.CountAsync(p => p.CourseId == courseId);
            return clientUserCount + studentUserCount;
        }

        private async Task<bool> IsDeprecatedUser(string userId)
        {
            var user = await _deprecatedUserRepository.FirstOrDefaultAsync(p => p.UserId == userId);
            return user != null;
        }

        public async Task<List<CourseDocument>> GetUsereDocuments(string userId)
        {
            var documents = await _courseDocuments.Where(p => p.UserId == userId).ToListAsync();
            return documents;
        }

        public async Task<List<CourseUsersDto>> GetCourseUsers(int courseId)
        {
            var users = await _clientUserRepository.Where(p => p.CourseId == courseId).ToListAsync();
            var resp = new List<CourseUsersDto>();
            foreach (var item in users)
            {
                var reg = await _preRegistrationsRepository.Include(p => p.Product)
                    .FirstOrDefaultAsync(p => p.EtUserId == item.Id);

                if (await IsDeprecatedUser(item.Id)) continue;
                var dto = new CourseUsersDto
                {
                    Id = item.Id,
                    Name = item.FirstName,
                    PhoneNumber = item.PhoneNumber,
                    Email = item.Email,
                    Photo = item.Photo,
                    Tckn = item.Tckn,
                    LicenseType = reg.Product.Name,
                };
                resp.Add(dto);
            }
            var students = await _courseStudentsRepository.Where(p => p.CourseId == courseId).ToListAsync();
            foreach (var student in students)
            {
                if (await IsDeprecatedUser(student.Id.ToString())) continue;
                var pr = await _productRepository.Where(p => p.Id == student.ProductId).Select(p => p.Name)
                    .FirstOrDefaultAsync();
                var dto = new CourseUsersDto
                {
                    Id = student.Id.ToString(),
                    Name = student.Name,
                    PhoneNumber = student.PhoneNumber,
                    Email = student.Email,
                    Photo = student.Photo,
                    Tckn = student.TcKn,
                    LicenseType = pr
                };
                resp.Add(dto);
            }
            return resp;
        }


        [HttpGet]
        public async Task<bool> DeprecateUser(string userId)
        {
            try
            {
                var user = _courseStudentsRepository.FirstOrDefaultAsync(p => p.Id == Guid.Parse(userId));
                if (user != null)
                {
                    await _deprecatedUserRepository.InsertAsync(new DeprecatedUser
                    {
                        UserId = userId
                    });
                    return true;
                }

                return false;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

    }
}