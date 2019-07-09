using System;
using EhliyetTurkiye.DrivingSchool.Entities.ClientEntities;
using EhliyetTurkiye.DrivingSchool.Enums;
using Volo.Abp.Application.Dtos;
using Volo.Abp.AutoMapper;

namespace EhliyetTurkiye.DrivingSchool.Services.PreReg
{
    [AutoMapFrom(typeof(PreRegistration))]
    public class PreRegistrationDto : EntityDto<int>
    {
        public int CourseId { get; set; }
        public PreRegistrationType Type { get; set; }
        public DateTime CreatedDate { get; set; }

        public string EtUserId { get; set; }
        public virtual EtUser EtUser { get; set; }
    }
}