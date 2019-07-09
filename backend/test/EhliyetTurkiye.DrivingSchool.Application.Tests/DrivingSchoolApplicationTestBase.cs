using Volo.Abp;

namespace EhliyetTurkiye.DrivingSchool
{
    public abstract class DrivingSchoolApplicationTestBase : AbpIntegratedTest<DrivingSchoolApplicationTestModule>
    {
        protected override void SetAbpApplicationCreationOptions(AbpApplicationCreationOptions options)
        {
            options.UseAutofac();
        }
    }
}
