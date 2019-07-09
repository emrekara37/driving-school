using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Localization;
using EhliyetTurkiye.DrivingSchool.Localization.DrivingSchool;
using Volo.Abp.UI.Navigation;

namespace EhliyetTurkiye.DrivingSchool.Menus
{
    public class DrivingSchoolMenuContributor : IMenuContributor
    {
        public async Task ConfigureMenuAsync(MenuConfigurationContext context)
        {
            if (context.Menu.Name == StandardMenus.Main)
            {
                await ConfigureMainMenuAsync(context);
            }
        }

        private async Task ConfigureMainMenuAsync(MenuConfigurationContext context)
        {
            var l = context.ServiceProvider.GetRequiredService<IStringLocalizer<DrivingSchoolResource>>();

            context.Menu.Items.Insert(0, new ApplicationMenuItem("DrivingSchool.Home", l["Menu:Home"], "/"));
        }
    }
}
