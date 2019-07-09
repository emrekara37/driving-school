using EhliyetTurkiye.DrivingSchool.Entities.ClientEntities;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.Data;
using Volo.Abp.EntityFrameworkCore;

namespace EhliyetTurkiye.DrivingSchool.EntityFrameworkCore
{
    [ConnectionStringName("EhliyetUi")]
    public class EhliyetUiDbContext : AbpDbContext<EhliyetUiDbContext>
    {
        public EhliyetUiDbContext(DbContextOptions<EhliyetUiDbContext> options):base(options)
        {
            
        }
        public DbSet<EtUser> EtUsers { get; set; }
        public DbSet<SeoSettings> SeoSettingses { get; set; }
        public DbSet<SocialMediaSettings> SocialMediaSettingses { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<County> Counties { get; set; }
        public DbSet<MailSubscibtion> MailSubscibtions { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<PaymentInformation> PaymentInformations { get; set; }
        public DbSet<PreRegistration> PreRegistrations { get; set; }
        public DbSet<Product> Products { get; set; }

    }
}