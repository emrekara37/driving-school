using Microsoft.AspNetCore.Mvc.Localization;
using Microsoft.AspNetCore.Mvc.Razor.Internal;
using EhliyetTurkiye.DrivingSchool.Localization.DrivingSchool;
using Volo.Abp.AspNetCore.Mvc.UI.RazorPages;

namespace EhliyetTurkiye.DrivingSchool.Pages
{
    public abstract class DrivingSchoolPageBase : AbpPage
    {
        [RazorInject]
        public IHtmlLocalizer<DrivingSchoolResource> L { get; set; }
    }
}
