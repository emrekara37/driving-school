using System.Threading.Tasks;

namespace EhliyetTurkiye.DrivingSchool.Managers.NotManager
{
    public interface IMailNotificationManager : INotificationManager
    {
        Task<NotificationResult> SendMail(EmailSendingModel model);

    }
}