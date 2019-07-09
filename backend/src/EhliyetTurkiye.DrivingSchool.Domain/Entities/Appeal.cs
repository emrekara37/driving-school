using EhliyetTurkiye.DrivingSchool.Enums;
using Volo.Abp.Domain.Entities;

namespace EhliyetTurkiye.DrivingSchool.Entities
{
    public class Appeal : Entity<int>
    {
        public string NameSurname { get; set; }
        public string TcKn { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string TaxNumber { get; set; }
        public string CourseName { get; set; }
        public string Address { get; set; }
        public int CityId { get; set; }
        public int CountyId { get; set; }
        public AppealType AppealType { get; set; }
        public AppealStateType AppealStateType { get; set; }
    }
}