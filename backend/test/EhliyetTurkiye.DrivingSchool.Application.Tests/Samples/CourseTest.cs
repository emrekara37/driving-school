using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using EhliyetTurkiye.DrivingSchool.Entities;
using EhliyetTurkiye.DrivingSchool.Entities.ClientEntities;
using EhliyetTurkiye.DrivingSchool.Services.Courses;
using EhliyetTurkiye.DrivingSchool.Services.ClientUsers;
using Shouldly;
using Xunit;

namespace EhliyetTurkiye.DrivingSchool.Samples
{
    public class CourseTest : DrivingSchoolApplicationTestBase
    {
        private readonly ICourseCarAppService _courseCarAppService;
        private readonly IClientUserAppService _clientUserAppService;

        public CourseTest(ICourseCarAppService courseCarAppService, IClientUserAppService clientUserAppService)
        {
            _courseCarAppService = courseCarAppService;
            _clientUserAppService = clientUserAppService;
        }

        private const int CourseId = 1;
        private const int CarId = 1;
        

        [Fact]
        public async Task Get_Course_Cars()
        {
            var list = await _courseCarAppService.GetListAsync(CourseId);
            list.ShouldBeOfType<List<CourseCar>>();
            list.ShouldNotBeNull();
        }

        [Fact]
        public async Task Get_Course_Car_ById()
        {
            var car = await _courseCarAppService.GetAsync(CourseId, CarId);
            car.ShouldBeOfType<CourseCar>();
            car.ShouldNotBeNull();
        }

        [Fact]
        public async Task Get_Course_Users()
        {
            var users = await _clientUserAppService.GetCourseUsers(CourseId);
            users.ShouldBeOfType<List<EtUser>>();
            users.ShouldNotBeNull();
           
            
        }

      
    }
}