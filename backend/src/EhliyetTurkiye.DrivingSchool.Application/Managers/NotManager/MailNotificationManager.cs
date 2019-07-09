using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace EhliyetTurkiye.DrivingSchool.Managers.NotManager
{
    public class MailNotificationManager : IMailNotificationManager
    {
        private const string HostName = "mail.ehliyetturkiye.com";
        private const int Port = 587;
        private const string UserName = "info@ehliyetturkiye.com";
        private const string Password = "Yirmibir21";


        public async Task<NotificationResult> SendMail(EmailSendingModel model)
        {
            try
            {
                using (var client = new SmtpClient(HostName, Port))
                {
                    client.UseDefaultCredentials = false;
                    client.Credentials = new NetworkCredential(UserName, Password);
                    using (var mailMessage = new MailMessage())
                    {
                        ServicePointManager.ServerCertificateValidationCallback =
                            (s, certificate, chain, sslPolicyErrors) => true;
                        mailMessage.From = new MailAddress(UserName);
                        mailMessage.To.Add(model.Reciever);
                        mailMessage.Body = model.Message;
                        mailMessage.Subject = model.Subject;
                        mailMessage.IsBodyHtml = true;
                        client.EnableSsl = true;
                        await client.SendMailAsync(mailMessage);
                        return NotificationResult.Success;
                    }
                }
            }
            catch (Exception e)
            {
                return NotificationResult.Failed;
                
            }
        }
    }
}