using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CoreBuyNow.Migrations
{
    /// <inheritdoc />
    public partial class FixItemInBill : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ProductName",
                table: "ItemInBills",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProductName",
                table: "ItemInBills");
        }
    }
}
