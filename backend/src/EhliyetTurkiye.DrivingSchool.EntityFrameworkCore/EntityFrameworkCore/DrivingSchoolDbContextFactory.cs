using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace EhliyetTurkiye.DrivingSchool.EntityFrameworkCore
{
    public class DrivingSchoolDbContextFactory : IDesignTimeDbContextFactory<DrivingSchoolDbContext>
    {
        public DrivingSchoolDbContext CreateDbContext(string[] args)
        {
            var configuration = BuildConfiguration();

            var builder = new DbContextOptionsBuilder<DrivingSchoolDbContext>()
                .UseSqlServer(configuration.GetConnectionString("Default"));

            return new DrivingSchoolDbContext(builder.Options);
        }

        private static IConfigurationRoot BuildConfiguration()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), "../EhliyetTurkiye.DrivingSchool.Ui/"))
                .AddJsonFile("appsettings.json", optional: false);

            return builder.Build();
        }
    }
}
