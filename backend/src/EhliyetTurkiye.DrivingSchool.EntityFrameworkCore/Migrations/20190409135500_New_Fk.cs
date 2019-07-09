using Microsoft.EntityFrameworkCore.Migrations;

namespace EhliyetTurkiye.DrivingSchool.Migrations
{
    public partial class New_Fk : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CourseId",
                table: "CourseCalendars",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_CourseCalendars_CourseId",
                table: "CourseCalendars",
                column: "CourseId");

            migrationBuilder.AddForeignKey(
                name: "FK_CourseCalendars_Courses_CourseId",
                table: "CourseCalendars",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CourseCalendars_Courses_CourseId",
                table: "CourseCalendars");

            migrationBuilder.DropIndex(
                name: "IX_CourseCalendars_CourseId",
                table: "CourseCalendars");

            migrationBuilder.DropColumn(
                name: "CourseId",
                table: "CourseCalendars");
        }
    }
}
