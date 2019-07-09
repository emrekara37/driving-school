using System;
using System.Security.Claims;
using System.Security.Principal;
using Volo.Abp.DependencyInjection;

namespace EhliyetTurkiye.DrivingSchool.Ui.Helpers
{


    public static class KeyHelper
    {
        public static string GetUserId(this ClaimsPrincipal principal)
        {
            return principal.FindFirst(ClaimTypes.NameIdentifier).Value;
        }
    }
}