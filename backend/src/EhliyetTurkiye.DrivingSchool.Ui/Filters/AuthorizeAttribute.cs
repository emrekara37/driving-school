using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Rewrite.Internal;

namespace EhliyetTurkiye.DrivingSchool.Ui.Filters
{
    public class AuthorizeAttribute:Attribute,IAuthorizationFilter
    {
        /*public void OnActionExecuting(ActionExecutingContext context)
        {
            try
            {
            
            }
            catch (Exception e)
            {
                
            }
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
        }*/

        public string RedirectUrl { get; set; } = "/account/login";

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            if (IsAuthorized(context) == false)
            {
                context.Result = new RedirectResult(RedirectUrl);
            }
        }

        private  bool IsAuthorized(AuthorizationFilterContext context)
        {
            try
            {
                var user = context.HttpContext.User;
                return user?.Identity != null && user.Identity.IsAuthenticated;
            }
            catch (Exception e)
            {
                return false;
            }
        }
    }
}