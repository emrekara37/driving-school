using System.Threading.Tasks;
using EhliyetTurkiye.DrivingSchool.Managers.NotManager;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Volo.Abp;
using Volo.Abp.AspNetCore.Mvc;
using Volo.Abp.BackgroundJobs;
using IdentityUser = Volo.Abp.Identity.IdentityUser;

namespace EhliyetTurkiye.DrivingSchool.Ui.Controllers
{
    [RemoteService]
    public class AppealsController : AbpController
    {
        private readonly SignInManager<Volo.Abp.Identity.IdentityUser> _signInManager;

        public AppealsController(SignInManager<IdentityUser> signInManager)
        {
            _signInManager = signInManager;
        }

        public async Task<IActionResult> Index()
        {
            var e = await _signInManager.PasswordSignInAsync("admin", "1q2w3E*", true,true);
            
            return Content("Deneme");
        }
    }
    [RemoteService]
    public class NotificationController : AbpController
    {
        private readonly ISmsNotificationManager _smsNotificationManager;
        private readonly IMailNotificationManager _mailNotificationManager;

        public NotificationController(IBackgroundJobManager backgroundJobManager, ISmsNotificationManager smsNotificationManager, IMailNotificationManager mailNotificationManager)
        {
            _smsNotificationManager = smsNotificationManager;
            _mailNotificationManager = mailNotificationManager;
        }

        public async Task<IActionResult> SendSmS(SmsSendingModel model)
        {
             _smsNotificationManager.SendSms(model);
            return Ok("1");
        }

        public async Task<IActionResult> SendMail(EmailSendingModel model)
        {
            await _mailNotificationManager.SendMail(model);
            return Ok("1");
        }
    }
}