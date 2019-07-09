using EhliyetTurkiye.DrivingSchool.Entities.ClientEntities;

namespace EhliyetTurkiye.DrivingSchool.Services.ClientUsers
{
    public class CourseUsersDto
    {
        public string Id { get; set; }
        public string PaymentId { get; set; }

        public string PhoneNumber { get; set; }
        public string Photo { get; set; }


        public string Name { get; set; }
        public string City { get; set; }
        public string County { get; set; }

        public string Periot { get; set; }
        public string LicenseType { get; set; }
        public string Email { get; set; }
        public string Tckn { get; set; }
    }
}