using System;
using System.Threading.Tasks;
using EhliyetTurkiye.DrivingSchool.Entities;
using EhliyetTurkiye.DrivingSchool.Enums;
using EhliyetTurkiye.DrivingSchool.Services;
using Microsoft.Extensions.DependencyInjection;
using Shouldly;
using Volo.Abp.Identity;
using Xunit;

namespace EhliyetTurkiye.DrivingSchool.Samples
{
    public class AppealTest : DrivingSchoolApplicationTestBase
    {
        private readonly IIdentityUserAppService _userAppService;
        private readonly IAppealService _appealService;

        public AppealTest()
        {
            _appealService = ServiceProvider.GetRequiredService<IAppealService>();
            _userAppService = ServiceProvider.GetRequiredService<IIdentityUserAppService>();
        }

        protected sealed override IServiceProvider ServiceProvider => base.ServiceProvider;

        [Fact]
        public async Task Initial_Data_Should_Contain_Admin_User()
        {
            var result = await _userAppService.GetListAsync(new GetIdentityUsersInput());
            result.TotalCount.ShouldBeGreaterThan(0);
            result.Items.ShouldContain(u => u.UserName == "admin");
        }

        [Fact]
        public async Task Create_Appeal()
        {
            var result = await _appealService.CreateAsync(new Appeal());
            result.ShouldBe(true);
        }

        [Fact]
        public async Task Change_Appeal_State()
        {
            var change = await _appealService.ChangeState(1, AppealStateType.Banned);
            change.ShouldBe(true);
        }        
        
    }
}