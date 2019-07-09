using System;

namespace EhliyetTurkiye.DrivingSchool.Permissions
{
    public static class DrivingSchoolPermissions
    {
        public const string GroupName = "DrivingSchool";

        //Add your own permission names. Example:
        //public const string MyPermission1 = GroupName + ".MyPermission1";

        public static string[] GetAll()
        {
            //Return an array of all permissions
            return Array.Empty<string>();
        }
    }
}