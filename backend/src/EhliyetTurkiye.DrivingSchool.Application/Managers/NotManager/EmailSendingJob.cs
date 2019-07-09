using System;
using System.Net;
using System.Net.Mail;
using Volo.Abp.BackgroundJobs;

namespace EhliyetTurkiye.DrivingSchool.Managers.NotManager
{
    public class EmailSendingJob : BackgroundJob<EmailSendingModel>
    {
        private const string HostName = "mail.ehliyetturkiye.com";
        private const int Port = 587;
        private const string UserName = "info@ehliyetturkiye.com";
        private const string Password = "Yirmibir21";

        public override void Execute(EmailSendingModel args)
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
                        mailMessage.To.Add(args.Reciever);
                        mailMessage.Body = args.Message;
                        mailMessage.Subject = args.Subject;
                        mailMessage.IsBodyHtml = true;
                        client.EnableSsl = true;
                        client.Send(mailMessage);
                    }
                }
            }
            catch (Exception e)
            {
                // TODO : Log
            }
        }
    }
}