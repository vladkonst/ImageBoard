using Microsoft.EntityFrameworkCore.Migrations;

namespace imageboard.Migrations
{
    public partial class BordesModelChange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Boards",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ShortName",
                table: "Boards",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Boards");

            migrationBuilder.DropColumn(
                name: "ShortName",
                table: "Boards");
        }
    }
}
