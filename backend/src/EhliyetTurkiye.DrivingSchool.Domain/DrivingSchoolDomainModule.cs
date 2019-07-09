using EhliyetTurkiye.DrivingSchool.Localization.DrivingSchool;
using EhliyetTurkiye.DrivingSchool.Settings;
using Volo.Abp.Auditing;
using Volo.Abp.AuditLogging;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.Identity;
using Volo.Abp.Localization;
using Volo.Abp.Localization.Resources.AbpValidation;
using Volo.Abp.Modularity;
using Volo.Abp.PermissionManagement.Identity;
using Volo.Abp.Settings;
using Volo.Abp.VirtualFileSystem;

namespace EhliyetTurkiye.DrivingSchool
{
    [DependsOn(
        typeof(AbpIdentityDomainModule),
        typeof(AbpPermissionManagementDomainIdentityModule),
        typeof(AbpAuditingModule),
        typeof(BackgroundJobsDomainModule),
        typeof(AbpAuditLoggingDomainModule)
        )]
    public class DrivingSchoolDomainModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<VirtualFileSystemOptions>(options =>
            {
                options.FileSets.AddEmbedded<DrivingSchoolDomainModule>("EhliyetTurkiye.DrivingSchool");
            });

            Configure<AbpLocalizationOptions>(options =>
            {
                options.Resources
                    .Add<DrivingSchoolResource>("en")
                    .AddBaseTypes(typeof(AbpValidationResource))
                    .AddVirtualJson("/Localization/DrivingSchool");
            });

            Configure<SettingOptions>(options =>
            {
                options.DefinitionProviders.Add<DrivingSchoolSettingDefinitionProvider>();
            });
        }
    }
}
