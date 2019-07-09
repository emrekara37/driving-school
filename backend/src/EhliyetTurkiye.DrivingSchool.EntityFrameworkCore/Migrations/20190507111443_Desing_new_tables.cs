using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace EhliyetTurkiye.DrivingSchool.Migrations
{
    public partial class Desing_new_tables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PaymentSchedulers");

            migrationBuilder.CreateTable(
                name: "CoursePayments",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Type = table.Column<int>(nullable: false),
                    CourseId = table.Column<int>(nullable: false),
                    UserId = table.Column<string>(nullable: true),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    TotalPrice = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CoursePayments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CoursePayments_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BillPayments",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    PaymentDate = table.Column<DateTime>(nullable: false),
                    IsPaid = table.Column<bool>(nullable: false),
                    InstallmentCount = table.Column<int>(nullable: false),
                    InstallmentFee = table.Column<decimal>(nullable: false),
                    RemainingPayment = table.Column<decimal>(nullable: false),
                    RegisterDate = table.Column<DateTime>(nullable: false),
                    Sequence = table.Column<int>(nullable: false),
                    CoursePaymentId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BillPayments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BillPayments_CoursePayments_CoursePaymentId",
                        column: x => x.CoursePaymentId,
                        principalTable: "CoursePayments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CashPayments",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Description = table.Column<string>(nullable: true),
                    Payment = table.Column<decimal>(nullable: false),
                    RegisterDate = table.Column<DateTime>(nullable: false),
                    CoursePaymentId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CashPayments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CashPayments_CoursePayments_CoursePaymentId",
                        column: x => x.CoursePaymentId,
                        principalTable: "CoursePayments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BillPayments_CoursePaymentId",
                table: "BillPayments",
                column: "CoursePaymentId");

            migrationBuilder.CreateIndex(
                name: "IX_CashPayments_CoursePaymentId",
                table: "CashPayments",
                column: "CoursePaymentId");

            migrationBuilder.CreateIndex(
                name: "IX_CoursePayments_CourseId",
                table: "CoursePayments",
                column: "CourseId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BillPayments");

            migrationBuilder.DropTable(
                name: "CashPayments");

            migrationBuilder.DropTable(
                name: "CoursePayments");

            migrationBuilder.CreateTable(
                name: "PaymentSchedulers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CourseId = table.Column<int>(nullable: false),
                    InstallmentCount = table.Column<int>(nullable: false),
                    InstallmentFee = table.Column<string>(nullable: true),
                    IsPaid = table.Column<bool>(nullable: false),
                    PaymentDate = table.Column<DateTime>(nullable: false),
                    RegisterDate = table.Column<DateTime>(nullable: false),
                    RemainingPayment = table.Column<string>(nullable: true),
                    Sequence = table.Column<int>(nullable: false),
                    TotalPayment = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PaymentSchedulers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PaymentSchedulers_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PaymentSchedulers_CourseId",
                table: "PaymentSchedulers",
                column: "CourseId");
        }
    }
}
