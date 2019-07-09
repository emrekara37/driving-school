using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using EhliyetTurkiye.DrivingSchool.Entities;
using EhliyetTurkiye.DrivingSchool.Entities.ClientEntities;
using EhliyetTurkiye.DrivingSchool.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Bcpg;
using Org.BouncyCastle.Crypto.Tls;
using PushbulletSharp.Models.Responses;
using Volo.Abp.Application.Services;
using Volo.Abp.AutoMapper;
using Volo.Abp.Domain.Repositories;

namespace EhliyetTurkiye.DrivingSchool.Services.Payments
{
    public class CoursePaymentAppService : ApplicationService, ICoursePaymentAppService
    {
        private readonly IRepository<CoursePayment, int> _repository;
        private readonly IRepository<CashPayment, int> _cashPayments;
        private readonly IRepository<BillPayment, int> _billPayments;
        private readonly IRepository<Payment, int> _clientPayments;
        private readonly IRepository<Course, int> _courses;

        public CoursePaymentAppService(IRepository<CoursePayment, int> repository,
            IRepository<CashPayment, int> cashPayments, IRepository<BillPayment, int> billPayments,
            IRepository<Payment, int> clientPayments, IRepository<Course, int> courses)
        {
            _repository = repository;
            _cashPayments = cashPayments;
            _billPayments = billPayments;
            _clientPayments = clientPayments;
            _courses = courses;
        }

        public async Task<UserCoursePaymentResult> GetUserPayment(string userId)
        {
            var payment = await _repository.FirstOrDefaultAsync(p => p.UserId == userId);

            if (payment != null)
            {
                var mapped = new UserCoursePaymentResult
                {
                    Type = payment.Type,
                    UserId = payment.UserId,
                    CreatedDate = payment.CreatedDate,
                    TotalPrice = payment.TotalPrice,
                    CourseId = payment.CourseId,
                    Method = await GetMethod(payment.Type, payment.Id),
                };
                return mapped;
            }

            return null;
        }

        private async Task<object> GetMethod(PaymentType type, int id)
        {
            switch (type)
            {
                case PaymentType.Cash:
                    return await _cashPayments.FirstOrDefaultAsync(p => p.CoursePaymentId == id);
                case PaymentType.Bill:
                    return await _billPayments.Where(p => p.CoursePaymentId == id).ToListAsync();

                case PaymentType.Online:
                    return await _clientPayments.FirstOrDefaultAsync(p => p.CoursePaymentId == id);

                default:
                    return null;
            }
        }

        [HttpGet]
        public async Task<List<object>> GetMonthlyBills(int courseId)
        {
            var payments = await _repository.Where(p => p.CourseId == courseId && p.Type == PaymentType.Bill).ToListAsync();
            
            foreach (var payment in payments)
            {

                var bill = await _billPayments.FirstOrDefaultAsync(p =>
                    p.CoursePaymentId == payment.Id && p.PaymentDate.Month == DateTime.Now.Month);
            }

            return null;
        }
        [HttpPost]
        public async Task<CoursePayment> Create(CoursePaymentDto payment)
        {
            var lastPaymentId = await _repository.OrderByDescending(p => p.Id).Select(p=>p.Id).FirstOrDefaultAsync();
            var coursePayment = new CoursePayment
            {
                Type = payment.Type,
                CourseId = payment.CourseId,
                CreatedDate = DateTime.Now,
                Id = lastPaymentId+1,
                TotalPrice = payment.TotalPrice,
                UserId = payment.UserId
            };
            await _repository.InsertAsync(coursePayment);
        
            return coursePayment;
        }

        public async Task<Payment> AddOnline(CoursePaymentDto dto)
        {
            try
            {
                var payment = await Create(dto);
                
                var course = await _courses.FirstOrDefaultAsync(p => p.Id == dto.CourseId);
                var clientPayment = new Payment
                {
                    Description = dto.Description,
                    EtUserId = dto.UserId,
                    CoursePaymentId = payment.Id,
                    CourseId = dto.CourseId,
                    CityId = course.CityId,
                    CountyId = course.CountyId,
                    Period = "",
                    Status = PaymentStatus.PaymentWaiting,
                    MerchantOid = await GenerateMerchandOid(),
                    CreatedTime = DateTime.Now,
                    PaymentAmount = dto.TotalPrice
                };
                await _clientPayments.InsertAsync(clientPayment);
                return clientPayment;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        private async Task<string> GenerateMerchandOid()
        {
            bool check;
            string number;
            do
            {
                var rnd = new Random();
                number = rnd.Next(1000, 999999).ToString();
                check = await _clientPayments.AnyAsync(p => p.MerchantOid.Equals(number));
            } while (check);

            return number;
        }

        [HttpGet]
        public async Task<bool> PaidBill(int id)
        {
            var bill = await _billPayments.FirstOrDefaultAsync(p => p.Id == id);
            bill.IsPaid = true;
            await _billPayments.UpdateAsync(bill);
            return true;
        }

        [HttpPost]
        public async Task<CashPayment> AddCash(CoursePaymentDto entity)

        {
            var payment = await Create(entity);
            var cash = new CashPayment
            {
                Payment = payment.TotalPrice,
                CoursePaymentId = payment.Id,
                RegisterDate = DateTime.Now,
                Description = entity.Description
            };
            return await _cashPayments.InsertAsync(cash);
        }

        [HttpPost]
        public async Task<BillPayment> AddBill(CoursePaymentDto dto)
        {
            try
            {
                var payment = await Create(dto);

                var fee = dto.TotalPrice / dto.InstallmentCount;

                var date = DateTime.Now;

                for (var i = 1; i <= dto.InstallmentCount; i++)
                {
                    var paymentDate = new DateTime(date.Year, date.Month, dto.PaymentDate);
                    paymentDate = paymentDate.AddMonths(i);


                    var bill = new BillPayment
                    {
                        Sequence = i,
                        InstallmentFee = fee,
                        RemainingPayment = dto.TotalPrice - (fee * i),
                        IsPaid = false,
                        RegisterDate = DateTime.Now,
                        CoursePaymentId = payment.Id,
                        InstallmentCount = dto.InstallmentCount,
                        PaymentDate = paymentDate
                    };
                    await _billPayments.InsertAsync(bill);
                }

                return new BillPayment();
            }
            catch (Exception e)
            {
                return null;
            }
        }


        [HttpGet]
        public async Task<int> GetCourseCountPayments(int id)
        {
            return await _repository.CountAsync(p => p.CourseId == id);
        }
    }

    public class UserCoursePaymentResult
    {
        public PaymentType Type { get; set; }
        public int CourseId { get; set; }
        public string UserId { get; set; }
        public DateTime CreatedDate { get; set; }
        public decimal TotalPrice { get; set; }
        public string Description { get; set; }
        public object Method { get; set; }
    }
}