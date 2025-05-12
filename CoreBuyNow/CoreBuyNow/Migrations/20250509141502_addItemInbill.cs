using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CoreBuyNow.Migrations
{
    /// <inheritdoc />
    public partial class addItemInbill : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ItemInCarts_Bills_BillId",
                table: "ItemInCarts");

            migrationBuilder.DropIndex(
                name: "IX_ItemInCarts_BillId",
                table: "ItemInCarts");

            migrationBuilder.DropColumn(
                name: "BillId",
                table: "ItemInCarts");

            migrationBuilder.CreateTable(
                name: "ItemInBills",
                columns: table => new
                {
                    ItemId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    BillId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    ProductId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    UnitPrice = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItemInBills", x => x.ItemId);
                    table.ForeignKey(
                        name: "FK_ItemInBills_Bills_BillId",
                        column: x => x.BillId,
                        principalTable: "Bills",
                        principalColumn: "BillId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ItemInBills_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "ProductId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_ItemInBills_BillId",
                table: "ItemInBills",
                column: "BillId");

            migrationBuilder.CreateIndex(
                name: "IX_ItemInBills_ProductId",
                table: "ItemInBills",
                column: "ProductId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ItemInBills");

            migrationBuilder.AddColumn<Guid>(
                name: "BillId",
                table: "ItemInCarts",
                type: "char(36)",
                nullable: true,
                collation: "ascii_general_ci");

            migrationBuilder.CreateIndex(
                name: "IX_ItemInCarts_BillId",
                table: "ItemInCarts",
                column: "BillId");

            migrationBuilder.AddForeignKey(
                name: "FK_ItemInCarts_Bills_BillId",
                table: "ItemInCarts",
                column: "BillId",
                principalTable: "Bills",
                principalColumn: "BillId");
        }
    }
}
