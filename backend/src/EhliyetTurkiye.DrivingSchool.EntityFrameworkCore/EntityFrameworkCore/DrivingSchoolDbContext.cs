using EhliyetTurkiye.DrivingSchool.Entities;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.AuditLogging.EntityFrameworkCore;
using Volo.Abp.BackgroundJobs.EntityFrameworkCore;
using Volo.Abp.Data;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.Identity.EntityFrameworkCore;
using Volo.Abp.PermissionManagement.EntityFrameworkCore;
using Volo.Abp.SettingManagement.EntityFrameworkCore;

namespace EhliyetTurkiye.DrivingSchool.EntityFrameworkCore
{
    [ConnectionStringName("Default")]
    public class DrivingSchoolDbContext : AbpDbContext<DrivingSchoolDbContext>
    {
        public DrivingSchoolDbContext(DbContextOptions<DrivingSchoolDbContext> options)
            : base(options)
        {

        }
        public DbSet<Appeal> Appeals { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<CourseCar> CourseCars { get; set; }
        public DbSet<CourseFeature> CourseFeatures { get; set; }
        public DbSet<CourseImage> CourseImages { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<CourseStudent> CourseStudents { get; set; }
        public DbSet<CourseCalendar> CourseCalendars { get; set; }
        public DbSet<DeprecatedUser> DeprecatedUsers { get; set; }
        public DbSet<CourseNote> CourseNotes{ get; set; }

        public DbSet<CoursePayment> CoursePayments { get; set; }
        public DbSet<CashPayment> CashPayments { get; set; }
        public DbSet<BillPayment> BillPayments { get; set; }

        public DbSet<CourseDocument> CourseDocuments { get; set; }
        

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ConfigureIdentity();
            modelBuilder.ConfigurePermissionManagement();
            modelBuilder.ConfigureSettingManagement();
            modelBuilder.ConfigureBackgroundJobs();
            modelBuilder.ConfigureAuditLogging();
        }
    }
}
