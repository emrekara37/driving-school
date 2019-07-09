using System.Threading.Tasks;

namespace EhliyetTurkiye.DrivingSchool.Managers.NotManager
{
    public interface ISmsNotificationManager : INotificationManager
    {
        NotificationResult SendSms(SmsSendingModel model);
    }
}