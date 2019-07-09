using System.ComponentModel.DataAnnotations.Schema;
using EhliyetTurkiye.DrivingSchool.Enums;
using Volo.Abp.Domain.Entities;

namespace EhliyetTurkiye.DrivingSchool.Entities.ClientEntities
{
    [Table("Products")]
    public class Product : Entity<int>
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public ProductType Type { get; set; }
        public decimal DiscountPrice { get; set; }

        public decimal GetPrice(bool isDrivingLicense)
        {
            return isDrivingLicense ? DiscountPrice : Price;
        }

    }

}