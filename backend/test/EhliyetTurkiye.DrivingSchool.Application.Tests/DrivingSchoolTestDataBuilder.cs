using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Identity;
using Volo.Abp.Threading;

namespace EhliyetTurkiye.DrivingSchool
{
    public class DrivingSchoolTestDataBuilder : ITransientDependency
    {
        private readonly IIdentityDataSeeder _identityDataSeeder;

        public DrivingSchoolTestDataBuilder(IIdentityDataSeeder identityDataSeeder)
        {
            _identityDataSeeder = identityDataSeeder;
        }

        public void Build()
        {
            AsyncHelper.RunSync(BuildInternalAsync);
        }

        public async Task BuildInternalAsync()
        {
            await _identityDataSeeder.SeedAsync("1q2w3E*");
        }
    }
}