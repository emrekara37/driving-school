using Volo.Abp.AspNetCore.Mvc.UI.Theme.Shared.Components;
using Volo.Abp.DependencyInjection;

namespace EhliyetTurkiye.DrivingSchool.Branding
{
    [Dependency(ReplaceServices = true)]
    public class DrivingSchoolBrandingProvider : DefaultBrandingProvider
    {
        public override string AppName => "DrivingSchool";
    }
}
