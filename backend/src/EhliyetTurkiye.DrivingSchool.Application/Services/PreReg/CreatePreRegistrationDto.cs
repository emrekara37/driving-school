using System;
using EhliyetTurkiye.DrivingSchool.Entities.ClientEntities;
using EhliyetTurkiye.DrivingSchool.Enums;
using Volo.Abp.AutoMapper;

namespace EhliyetTurkiye.DrivingSchool.Services.PreReg
{
    [AutoMapTo(typeof(PreRegistration))]
    [AutoMapFrom(typeof(PreRegistrationDto))]
    public class CreatePreRegistrationDto
    {
        public int Id { get; set; }

        public int CourseId { get; set; }
        public PreRegistrationType Type { get; set; }
        public DateTime CreatedDate { get; set; }
        public int ProductId { get; set; }

        public string EtUserId { get; set; }
        public virtual EtUser EtUser { get; set; }
    }
}