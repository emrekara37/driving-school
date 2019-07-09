using Volo.Abp.Domain.Entities;

namespace EhliyetTurkiye.DrivingSchool.Entities.ClientEntities
{
    public class SocialMediaSettings : Entity<int>, IEntity
    {
        public string Facebook { get; set; }
        public string Twitter { get; set; }
        public string GooglePlus { get; set; }
        public string Instagram { get; set; }
        public string Linkedin { get; set; }
    }
}
