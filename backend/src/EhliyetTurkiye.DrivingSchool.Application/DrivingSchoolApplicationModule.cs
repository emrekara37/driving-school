using EhliyetTurkiye.DrivingSchool.Permissions;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.AutoMapper;
using Volo.Abp.Identity;
using Volo.Abp.Modularity;
using Volo.Abp.PermissionManagement;

namespace EhliyetTurkiye.DrivingSchool
{
    [DependsOn(
        typeof(DrivingSchoolDomainModule),
        typeof(AbpIdentityApplicationModule),
        typeof(AbpPermissionManagementApplicationModule)
    )]
    public class DrivingSchoolApplicationModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<PermissionOptions>(options =>
            {
                options.DefinitionProviders.Add<DrivingSchoolPermissionDefinitionProvider>();
            });


            Configure<AbpAutoMapperOptions>(options =>
            {
                options.AddProfile<DrivingSchoolApplicationAutoMapperProfile>();
            });
        }
    }
}