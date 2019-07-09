namespace EhliyetTurkiye.DrivingSchool.Managers.NotManager
{
    public class SendNotificationModel
    {
        public string Reciever { get; set; }
        public string Sender { get; set; }
        public string Message { get; set; }
        public string Subject { get; set; }
    }
}