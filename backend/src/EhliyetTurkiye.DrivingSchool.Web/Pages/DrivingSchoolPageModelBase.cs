using EhliyetTurkiye.DrivingSchool.Localization.DrivingSchool;
using Volo.Abp.AspNetCore.Mvc.UI.RazorPages;

namespace EhliyetTurkiye.DrivingSchool.Pages
{
    public abstract class DrivingSchoolPageModelBase : AbpPageModel
    {
        protected DrivingSchoolPageModelBase()
        {
            LocalizationResourceType = typeof(DrivingSchoolResource);
        }
    }
}