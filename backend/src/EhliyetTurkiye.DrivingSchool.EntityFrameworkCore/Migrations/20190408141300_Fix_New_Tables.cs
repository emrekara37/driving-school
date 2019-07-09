using Microsoft.EntityFrameworkCore.Migrations;

namespace EhliyetTurkiye.DrivingSchool.Migrations
{
    public partial class Fix_New_Tables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CourseId",
                table: "CourseStudents",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_CourseStudents_CourseId",
                table: "CourseStudents",
                column: "CourseId");

            migrationBuilder.AddForeignKey(
                name: "FK_CourseStudents_Courses_CourseId",
                table: "CourseStudents",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CourseStudents_Courses_CourseId",
                table: "CourseStudents");

            migrationBuilder.DropIndex(
                name: "IX_CourseStudents_CourseId",
                table: "CourseStudents");

            migrationBuilder.DropColumn(
                name: "CourseId",
                table: "CourseStudents");
        }
    }
}
