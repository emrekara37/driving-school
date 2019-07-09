using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace EhliyetTurkiye.DrivingSchool.Migrations
{
    public partial class New_Table_Dc : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CourseDocuments",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CourseId = table.Column<int>(nullable: false),
                    UserId = table.Column<string>(nullable: true),
                    Key = table.Column<string>(nullable: true),
                    FilePath = table.Column<string>(nullable: true),
                    Title = table.Column<string>(nullable: true),
                    DocumentType = table.Column<byte>(nullable: false),
                    IsSending = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseDocuments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CourseDocuments_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CourseDocuments_CourseId",
                table: "CourseDocuments",
                column: "CourseId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CourseDocuments");
        }
    }
}
