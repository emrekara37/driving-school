using System;
using System.Linq;
using PushbulletSharp;
using PushbulletSharp.Models.Requests.Ephemerals;
using Volo.Abp.BackgroundJobs;


namespace EhliyetTurkiye.DrivingSchool.Managers.NotManager
{
    public class SmsSendingJob : BackgroundJob<SmsSendingModel>
    {
        private const string ApiKey = "o.4fQyikWufUnYE3sfEiduFHlwAbEC1R6H";
        private const string Password = "zaza377";

        public override void Execute(SmsSendingModel args)
        {
            try
            {
                var client = new PushbulletClient(ApiKey, Password, TimeZoneInfo.Local);
                var currentUser = client.CurrentUsersInformation();
                var userDevices = client.CurrentUsersDevices(true);
                var smsDevice = userDevices.Devices.FirstOrDefault(o => o.HasSMS);

                if (smsDevice == null)
                {
                    return;
                }

                var smsRequest = new SMSEphemeral()
                {
                    ConversationIden = args.PhoneNumber,
                    Message = args.Message,
                    SourceUserIden = currentUser.Iden,
                    TargetDeviceIden = smsDevice.Iden
                };
                var result = client.PushEphemeral(smsRequest, true);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }
    }
}