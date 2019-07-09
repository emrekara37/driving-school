using System;
using Volo.Abp.Domain.Entities;

namespace EhliyetTurkiye.DrivingSchool.Entities.ClientEntities
{
    public class MailSubscibtion : Entity<int>, IEntity
    {
        public string Mail { get; set; }
        public DateTime CreatedTime { get; set; }
        public bool IsActive { get; set; }
    }
}