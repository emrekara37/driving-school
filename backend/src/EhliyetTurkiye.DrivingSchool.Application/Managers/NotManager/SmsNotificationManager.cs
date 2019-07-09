using System;
using System.Linq;
using System.Threading.Tasks;
using EhliyetTurkiye.DrivingSchool.Entities;
using EhliyetTurkiye.DrivingSchool.Entities.ClientEntities;
using Microsoft.EntityFrameworkCore;
using PushbulletSharp;
using PushbulletSharp.Models.Requests.Ephemerals;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Repositories;

namespace EhliyetTurkiye.DrivingSchool.Managers.NotManager
{
    public class SmsNotificationManager : ISmsNotificationManager,ITransientDependency
    {
        private readonly IBackgroundJobManager _backgroundJobManager;
        private readonly IRepository<EtUser,string> _etUsers;
        private readonly IRepository<CourseStudent,Guid> _courseStudents;

        public SmsNotificationManager(IBackgroundJobManager backgroundJobManager, IRepository<CourseStudent, Guid> courseStudents, IRepository<EtUser, string> repository)
        {
            _courseStudents = courseStudents;
            _etUsers = repository;
            _backgroundJobManager = backgroundJobManager;
        }

        private const string ApiKey = "o.4fQyikWufUnYE3sfEiduFHlwAbEC1R6H";
        private const string Password = "zaza377";
        
        public NotificationResult SendSms(SmsSendingModel model)
        {
            try
            {
                var client = new PushbulletClient(ApiKey, Password, TimeZoneInfo.Local);
                var currentUser = client.CurrentUsersInformation();
                var userDevices = client.CurrentUsersDevices(true);
                var smsDevice = userDevices.Devices.FirstOrDefault(o => o.HasSMS);

                if (smsDevice == null)
                {
                    return NotificationResult.Failed;
                }
                var smsRequest = new SMSEphemeral
                {
                    ConversationIden = model.PhoneNumber,
                    Message = model.Message,
                    SourceUserIden = currentUser.Iden,
                    TargetDeviceIden = smsDevice.Iden
                };
                var result = client.PushEphemeral(smsRequest, true);
                return NotificationResult.Success;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return NotificationResult.Failed;
            }
        }
       
    }
}