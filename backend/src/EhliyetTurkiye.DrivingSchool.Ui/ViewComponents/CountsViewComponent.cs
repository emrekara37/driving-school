using System.Linq;
using System.Net;
using System.Runtime.InteropServices;
using System.Security.Claims;
using System.Threading.Tasks;
using EhliyetTurkiye.DrivingSchool.Services.Courses;
using EhliyetTurkiye.DrivingSchool.Ui.Helpers;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata;
using Volo.Abp.AspNetCore.Mvc;
using Volo.Abp.Users;
using IdentityUser = Volo.Abp.Identity.IdentityUser;

namespace EhliyetTurkiye.DrivingSchool.Ui.ViewComponents
{
    public class CountsViewComponent:AbpViewComponent
    {

        private readonly ICourseAppService _courseAppService;

        public CountsViewComponent(ICourseAppService courseAppService)
        {
            _courseAppService = courseAppService;
        }
        
        public async Task<IViewComponentResult> InvokeAsync()
        {
            var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var model = new CountsViewComponentModel {CarCount = await _courseAppService.GetCourseCarCountAsync(await _courseAppService.GetCourseId(userId))};
            return View(model);
            
        }

        public class CountsViewComponentModel
        {
            public int CarCount { get; set; }
        }
    }
}