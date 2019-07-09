using System.Collections.Generic;
using Microsoft.VisualBasic.CompilerServices;

namespace EhliyetTurkiye.DrivingSchool
{
    public class ApiResponseModel
    {
        public object Data { get; set; }
        public int StatusCode { get; set; }
        public List<string> Errors { get; set; }
        public bool IsSuccess { get; set; }
        public string Message { get; set; }

        public ApiResponseModel()
        {
            Errors = new List<string>();
        }
    }
    
}