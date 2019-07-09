using Volo.Abp.Domain.Entities;

namespace EhliyetTurkiye.DrivingSchool.Entities.ClientEntities
{
    public class SeoSettings : Entity<int>, IEntity
    {
        public string Key { get; set; }
        public string Content { get; set; }
    }
}