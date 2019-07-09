using System.Collections.Generic;
using Volo.Abp.Domain.Entities;

namespace EhliyetTurkiye.DrivingSchool.Entities.ClientEntities
{
    public class City : Entity<int>
    {
        public string Name { get; set; }

        public virtual List<County> Counties { get; set; }

        public string Plate { get; set; }
    }
}