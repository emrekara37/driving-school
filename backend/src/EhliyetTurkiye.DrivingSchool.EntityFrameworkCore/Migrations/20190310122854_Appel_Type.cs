using Microsoft.EntityFrameworkCore.Migrations;

namespace EhliyetTurkiye.DrivingSchool.Migrations
{
    public partial class Appel_Type : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte>(
                name: "AppealStateType",
                table: "Appeals",
                nullable: false,
                defaultValue: (byte)0);

            migrationBuilder.AddColumn<byte>(
                name: "AppealType",
                table: "Appeals",
                nullable: false,
                defaultValue: (byte)0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AppealStateType",
                table: "Appeals");

            migrationBuilder.DropColumn(
                name: "AppealType",
                table: "Appeals");
        }
    }
}
