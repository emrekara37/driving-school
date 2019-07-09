using Volo.Abp.Domain.Entities;

namespace EhliyetTurkiye.DrivingSchool.Entities
{
    public class DeprecatedUser : Entity<int>
    {
        public string UserId { get; set; }
    }
}