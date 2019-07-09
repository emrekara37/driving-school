using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.AuditLogging.EntityFrameworkCore;
using Volo.Abp.BackgroundJobs.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore.SqlServer;
using Volo.Abp.Identity.EntityFrameworkCore;
using Volo.Abp.Modularity;
using Volo.Abp.PermissionManagement.EntityFrameworkCore;
using Volo.Abp.SettingManagement.EntityFrameworkCore;

namespace EhliyetTurkiye.DrivingSchool.EntityFrameworkCore
{
    [DependsOn(
        typeof(DrivingSchoolDomainModule),
        typeof(AbpIdentityEntityFrameworkCoreModule),
        typeof(AbpPermissionManagementEntityFrameworkCoreModule),
        typeof(AbpSettingManagementEntityFrameworkCoreModule),
        typeof(AbpEntityFrameworkCoreSqlServerModule),
        typeof(BackgroundJobsEntityFrameworkCoreModule),
        typeof(AbpAuditLoggingEntityFrameworkCoreModule)
        )]
    public class DrivingSchoolEntityFrameworkCoreModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            context.Services.AddAbpDbContext<DrivingSchoolDbContext>(options =>
            {
                //Remove "includeAllEntities: true" to create default repositories only for aggregate roots
                options.AddDefaultRepositories(true);
            });
            context.Services.AddAbpDbContext<EhliyetUiDbContext>(options =>
            {
                options.AddDefaultRepositories(true);
            });
        }
    }
}
