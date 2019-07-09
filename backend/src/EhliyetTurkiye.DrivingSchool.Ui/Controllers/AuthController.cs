using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Runtime.InteropServices;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using EhliyetTurkiye.DrivingSchool.Dtos;
using EhliyetTurkiye.DrivingSchool.Entities;
using EhliyetTurkiye.DrivingSchool.Managers.NotManager;
using EhliyetTurkiye.DrivingSchool.Services.Courses;
using EhliyetTurkiye.DrivingSchool.Ui.Helpers;
using EhliyetTurkiye.DrivingSchool.Ui.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Volo.Abp;
using Volo.Abp.Account.Web.Pages.Account;
using Volo.Abp.AspNetCore.Mvc;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Identity;
using Volo.Abp.Uow;
using Volo.Abp.Users;
using IdentityUser = Volo.Abp.Identity.IdentityUser;

namespace EhliyetTurkiye.DrivingSchool.Ui.Controllers
{
    [RemoteService]
    public class AuthController : AbpController
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly ICourseAppService _courseAppService;
        private readonly IRepository<IdentityUser, Guid> _users;
        private readonly IMailNotificationManager _mailNotificationManager;

        public AuthController(UserManager<IdentityUser> userManager,
            ICourseAppService courseAppService, IRepository<IdentityUser, Guid> users,
            IMailNotificationManager mailNotificationManager)
        {
            _userManager = userManager;
            _courseAppService = courseAppService;
            _users = users;
            _mailNotificationManager = mailNotificationManager;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginModelDto model)
        {
            var user = await _userManager.FindByNameAsync(model.UserName);
            if (user == null || !await _userManager.CheckPasswordAsync(user, model.Password))
                return Unauthorized("Giriş bilgilerinizi kontrol ediniz");
//            var isAdmin = await _userManager.IsInRoleAsync(user, "admin");
//            if (isAdmin == false)
//            {
//                //todo:admine erişmeye çalışan  normal bir kullanıcı loglama yapılabilir
//                return Unauthorized("Buraya giriş yetkiniz yok");
//            }


            var courseId = await _courseAppService.GetCourseId(user.Id.ToString());

            var course = await _courseAppService.GetCourse(courseId);
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("CourseId", courseId.ToString()),
            };
            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(AuthSettings.JwtKey));

            var token = new JwtSecurityToken(
                issuer: AuthSettings.ValidHttp,
                audience: AuthSettings.ValidHttp,
                expires: DateTime.UtcNow.AddDays(1),
                claims: claims,
                signingCredentials: new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256)
            );
            var writedToken = new JwtSecurityTokenHandler().WriteToken(token);
            return Ok(new
            {
                token = writedToken,
                expiration = token.ValidTo,
                course
            });
        }


        [HttpPost]
        [UnitOfWork]
        public async Task<IActionResult> Register(RegisterModel model)
        {
            try
            {
                var user = new IdentityUser(Guid.Parse(model.UserId), model.UserName, model.Email, CurrentTenant.Id);

                var result = await _userManager.CreateAsync(user, model.Password);

                if (result == IdentityResult.Success)
                {
                    await _userManager.SetEmailAsync(user, model.Email);
                    await _courseAppService.CreateAsync(new Course
                    {
                        IdentityUserId = Guid.Parse(model.UserId),
                        CityId = model.CityId,
                        CountyId = model.CountyId,
                        CourseName = model.CourseName,
                        PhoneNumber = model.PhoneNumber,
                        PersonelPhoneNumber = model.PhoneNumber,
                        Address = model.Address,
                        Logo = "",
                        FaxNumber = "",
                        TaxNumber = ""
                    });
                    return Ok("Ok");
                }

                return BadRequest(result.Errors.ToList()[0].Description);
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> ChangePassword(ChangePasswordModel model)
        {
            try
            {
                var c = await _courseAppService.GetCourse(model.CourseId);
                var user = await _users.FirstOrDefaultAsync(p => p.Id == c.IdentityUserId);
                var ok = await _userManager.ChangePasswordAsync(user, model.CurrentPassword, model.Password);
                if (ok.Succeeded)
                {
                    return Ok();
                }

                return BadRequest(ok.Errors.ToArray()[0].Description);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return NotFound("UserNotFound");
            }

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var byt = Encoding.UTF8.GetBytes($"{user.Id.ToString()}||{token}");

            var encoded = Convert.ToBase64String(byt);
            var link = $"http://localhost:3000/resetpassword/{encoded}";
            var res = await _mailNotificationManager.SendMail(new EmailSendingModel
            {
                Message = $"Şifre Değiştirmek İçin Tıklayın <br /> <a href='{link}'>Tıkla</a>",
                Reciever = model.Email,
                Subject = "Şifre Değiştirme"
            });
            return Ok("Send");
        }

        [HttpPost]
        public async Task<IActionResult> ResetPassword(ResetPasswordModel model)
        {
            var user = await _userManager.FindByIdAsync(model.UserId);
            var res = await _userManager.ResetPasswordAsync(user, model.Token, model.Password);
            return Ok(res.Succeeded ? "1" : "0");
        }
    }

    public class ResetPasswordModel
    {
        public string Password { get; set; }
        public string UserId { get; set; }
        public string Token { get; set; }
    }

    public class ForgotPasswordModel
    {
        public string Email { get; set; }
    }


    public class ChangePasswordModel
    {
        public string Password { get; set; }
        public string CurrentPassword { get; set; }
        public int CourseId { get; set; }
    }

    public class RegisterModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string UserId { get; set; }
        public string CourseName { get; set; }
        public int CityId { get; set; }
        public int CountyId { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
    }
}