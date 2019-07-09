using EhliyetTurkiye.DrivingSchool.Localization.DrivingSchool;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace EhliyetTurkiye.DrivingSchool.Permissions
{
    public class DrivingSchoolPermissionDefinitionProvider : PermissionDefinitionProvider
    {
        public override void Define(IPermissionDefinitionContext context)
        {
            var myGroup = context.AddGroup(DrivingSchoolPermissions.GroupName);

            //Define your own permissions here. Examaple:
            //myGroup.AddPermission(DrivingSchoolPermissions.MyPermission1, L("Permission:MyPermission1"));
        }

        private static LocalizableString L(string name)
        {
            return LocalizableString.Create<DrivingSchoolResource>(name);
        }
    }
}