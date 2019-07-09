using System;
using System.IO;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using FluentFTP;
using Microsoft.AspNetCore.Http;
using Remotion.Linq.Clauses.ResultOperators;
using Volo.Abp.DependencyInjection;

namespace EhliyetTurkiye.DrivingSchool.Managers
{
    public class ImageUploadManager : IScopedDependency
    {
        private const string FtpName = "eyprojeler.xyz";
        private const string FtpUserName = "eyprojel";
        private const string Password = "Yirmibir21";

        private FtpClient ConnectFtp()
        {
            try
            {
                var client = new FtpClient(FtpName)
                {
                    Credentials = new NetworkCredential(FtpUserName, Password)
                };

                client.Connect();
                return client;
            }
            catch (Exception e)
            {
                throw new NullReferenceException();
            }
        }

        public string AddImage(IFormFile file, string folderName, string fileName = "")
        {
            try
            {
                fileName = string.IsNullOrEmpty(fileName) ? FileNameNormalizer(file.FileName) : fileName;
                var request = ConnectFtp();
                var str = file.OpenReadStream();
                var ms = new MemoryStream();
                var ext = Path.GetExtension(file.FileName);
                const string url = "cdn.eyprojeler.xyz";
                var fullPath = $"{url}/{folderName}/{fileName}{ext}";
                str.CopyTo(ms);
                request.Upload(ms.ToArray(), $"/{fullPath}", FtpExists.Overwrite, true);
                ms.Close();
                ms.Dispose();
                str.Close();
                request.Disconnect();
                request.Dispose();
                str.Dispose();
                return "https://" + fullPath;
            }

            catch (Exception e)
            {
                return "0";
            }
        }

        private string FileNameNormalizer(string fileName)
        {
            return fileName.Trim().ToLower().Replace(" ", "");
        }

        //todo : İçi doldurularacak
        private void CreateIfNotExist(string folderName)
        {
            try
            {
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}