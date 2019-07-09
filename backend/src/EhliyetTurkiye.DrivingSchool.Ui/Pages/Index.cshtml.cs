using EhliyetTurkiye.DrivingSchool.Ui.Filters;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Volo.Abp.AspNetCore.Mvc.UI.RazorPages;

namespace EhliyetTurkiye.DrivingSchool.Ui.Pages
{
    
    [Authorize]
    public class Index : AbpPageModel
    {
        public void OnGet()
        {
        }
    }
}