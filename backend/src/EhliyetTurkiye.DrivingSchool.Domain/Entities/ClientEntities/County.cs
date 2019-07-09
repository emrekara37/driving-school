using System.ComponentModel.DataAnnotations.Schema;
using Volo.Abp.Domain.Entities;

namespace EhliyetTurkiye.DrivingSchool.Entities.ClientEntities
{
    public class County : Entity<int>, IEntity
    {

        [ForeignKey(nameof(CityId))]
        public virtual City City { get; set; }
        public int CityId { get; set; }
        public string Name { get; set; }

        public string CountyImage { get; set; }


    }
}