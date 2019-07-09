using System;
using Shouldly;
using Xunit;

namespace EhliyetTurkiye.DrivingSchool.Samples
{
    public class SampleTest : DrivingSchoolApplicationTestBase
    {
        [Fact]
        public void Check_Course_Calendar_Date()
        {
            var date = DateTime.Now.ToString("MM dd yyyy");
            const string str = "04 24 2019, 4:00:00";
            str.ShouldContain(date);
            
        }
    }
}
