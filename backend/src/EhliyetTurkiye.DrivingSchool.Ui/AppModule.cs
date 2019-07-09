using System;
using System.Linq;
using System.Threading.Tasks;
using EhliyetTurkiye.DrivingSchool.EntityFrameworkCore;
using EhliyetTurkiye.DrivingSchool.Permissions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Swashbuckle.AspNetCore.Swagger;
using Volo.Abp;
using Volo.Abp.Account.Web;
using Volo.Abp.AspNetCore.Mvc;
using Volo.Abp.AspNetCore.Mvc.UI.Bootstrap;
using Volo.Abp.AspNetCore.Mvc.UI.Bundling;
using Volo.Abp.AspNetCore.Mvc.UI.Theme.Basic;
using Volo.Abp.AspNetCore.Mvc.UI.Theme.Shared;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Autofac;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.Identity;
using Volo.Abp.Identity.AspNetCore;
using Volo.Abp.Identity.EntityFrameworkCore;
using Volo.Abp.Identity.Web;
using Volo.Abp.Modularity;
using Volo.Abp.PermissionManagement;
using Volo.Abp.Threading;
using IdentityRole = Volo.Abp.Identity.IdentityRole;
using IdentityUser = Volo.Abp.Identity.IdentityUser;

namespace EhliyetTurkiye.DrivingSchool.Ui
{
    [DependsOn(
        typeof(DrivingSchoolApplicationModule),
        typeof(DrivingSchoolEntityFrameworkCoreModule),
        typeof(AbpAutofacModule),
        typeof(AbpBackgroundJobsModule),
        typeof(AbpIdentityHttpApiModule),
        typeof(AbpIdentityAspNetCoreModule),
        typeof(AbpAspNetCoreMvcUiThemeSharedModule),
        typeof(AbpAspNetCoreMvcUiBasicThemeModule),
        typeof(AbpAspNetCoreMvcModule)
    )]
    public class AppModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            //context.Services.AddAssemblyOf<AppModule>();
            //context.Services.AddAssemblyOf<AdminApplicationModule>();
            context.Services.ConfigureApplicationCookie(opt =>
            {
                opt.LoginPath = new PathString("/account/login");
                opt.ExpireTimeSpan = TimeSpan.FromDays(1);
                opt.Cookie.Expiration = TimeSpan.FromDays(1);
                opt.Cookie.HttpOnly = false;
            });
            
            Configure<BackgroundJobWorkerOptions>(options =>
            {
                options.DefaultTimeout = 86400; //10 days (as seconds)
            });
            context.Services.AddAuthorization();
            context.Services.AddCors(opt => { opt.AddPolicy("Allow", builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod().Build()); });
            context.Services.AddSession();
            ConfigureAutoApiControllers();
            ConfigureDatabaseServices();
            ConfigureSwaggerServices(context.Services);
            context.Services.AddMvc()
                .AddRazorPagesOptions(p => { p.Conventions.AddPageRoute("/settings", "/ayarlar"); });
        }

        private void ConfigureSwaggerServices(IServiceCollection services)
        {
            services.AddSwaggerGen(
                options =>
                {
                    options.SwaggerDoc("v1", new Info {Title = "DrivingSchool API", Version = "v1"});
                    options.DocInclusionPredicate((docName, description) => true);
                    options.CustomSchemaIds(type => type.FullName);
                });
        }

        private void ConfigureDatabaseServices()
        {
            Configure<AbpDbContextOptions>(options => { options.UseSqlServer(); });
        }


        public override void OnApplicationInitialization(ApplicationInitializationContext context)
        {
            var app = context.GetApplicationBuilder();
            var env = context.GetEnvironment();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseDeveloperExceptionPage();
            app.UseCookiePolicy();
            app.UseSession();
            app.UseAuthentication();
            app.UseCors("Allow");
            app.UseSwagger();
            app.UseSwaggerUI(options => { options.SwaggerEndpoint("/swagger/v1/swagger.json", "DrivingSchool API"); });
            app.UseStaticFiles();
            //app.UseAuditing();
            app.UseMvcWithDefaultRoute();
            SeedDatabase(context);
        }

        private static void SeedDatabase(ApplicationInitializationContext context)
        {
            using (var scope = context.ServiceProvider.CreateScope())
            {
                AsyncHelper.RunSync(async () =>
                {
                    var identitySeedResult = await scope.ServiceProvider
                        .GetRequiredService<IIdentityDataSeeder>()
                        .SeedAsync(
                            "1q2w3E*"
                        );

                    if (identitySeedResult.CreatedAdminRole)
                    {
                        await scope.ServiceProvider
                            .GetRequiredService<IPermissionDataSeeder>()
                            .SeedAsync(
                                RolePermissionValueProvider.ProviderName,
                                "admin",
                                IdentityPermissions.GetAll().Union(DrivingSchoolPermissions.GetAll())
                            );
                    }
                });
            }
        }

        private void ConfigureAutoApiControllers()
        {
            Configure<AbpAspNetCoreMvcOptions>(options =>
            {
                options.ConventionalControllers.Create(typeof(DrivingSchoolApplicationModule).Assembly);
            });
        }
    }

    public class OverridePasswordValidator<TUSer> : PasswordValidator<TUSer> where TUSer : IdentityUser
    {
        
        public override Task<IdentityResult> ValidateAsync(UserManager<TUSer> manager, TUSer user, string password)
        {
            manager.Options = new IdentityOptions
            {
                Password = new PasswordOptions
                {
                    RequireDigit = false,
                    RequireLowercase = false,
                    RequiredLength = 5,
                    RequireUppercase = false,
                    RequiredUniqueChars = 0,
                    RequireNonAlphanumeric = false
                }
            };
            
            return base.ValidateAsync(manager, user, password);
        }
    }
}