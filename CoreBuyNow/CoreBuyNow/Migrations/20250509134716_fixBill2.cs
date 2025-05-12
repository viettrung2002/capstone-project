using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CoreBuyNow.Migrations
{
    /// <inheritdoc />
    public partial class fixBill2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bills_Products_ProductId",
                table: "Bills");

            migrationBuilder.DropIndex(
                name: "IX_Bills_ProductId",
                table: "Bills");

            migrationBuilder.DropColumn(
                name: "ShippingVoucherId",
                table: "ItemInCarts");

            migrationBuilder.DropColumn(
                name: "VoucherId",
                table: "ItemInCarts");

            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "Bills");

            migrationBuilder.RenameColumn(
                name: "ProductId",
                table: "Bills",
                newName: "VoucherId");

            migrationBuilder.AddColumn<Guid>(
                name: "BillId",
                table: "ItemInCarts",
                type: "char(36)",
                nullable: true,
                collation: "ascii_general_ci");

            migrationBuilder.AddColumn<Guid>(
                name: "ItemInCartId",
                table: "Bills",
                type: "char(36)",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                collation: "ascii_general_ci");

            migrationBuilder.AddColumn<Guid>(
                name: "ShippingVoucherId",
                table: "Bills",
                type: "char(36)",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                collation: "ascii_general_ci");

            migrationBuilder.AddColumn<Guid>(
                name: "ShopId",
                table: "Bills",
                type: "char(36)",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                collation: "ascii_general_ci");

            migrationBuilder.CreateIndex(
                name: "IX_ItemInCarts_BillId",
                table: "ItemInCarts",
                column: "BillId");

            migrationBuilder.CreateIndex(
                name: "IX_Bills_ShopId",
                table: "Bills",
                column: "ShopId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bills_Shops_ShopId",
                table: "Bills",
                column: "ShopId",
                principalTable: "Shops",
                principalColumn: "ShopId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ItemInCarts_Bills_BillId",
                table: "ItemInCarts",
                column: "BillId",
                principalTable: "Bills",
                principalColumn: "BillId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bills_Shops_ShopId",
                table: "Bills");

            migrationBuilder.DropForeignKey(
                name: "FK_ItemInCarts_Bills_BillId",
                table: "ItemInCarts");

            migrationBuilder.DropIndex(
                name: "IX_ItemInCarts_BillId",
                table: "ItemInCarts");

            migrationBuilder.DropIndex(
                name: "IX_Bills_ShopId",
                table: "Bills");

            migrationBuilder.DropColumn(
                name: "BillId",
                table: "ItemInCarts");

            migrationBuilder.DropColumn(
                name: "ItemInCartId",
                table: "Bills");

            migrationBuilder.DropColumn(
                name: "ShippingVoucherId",
                table: "Bills");

            migrationBuilder.DropColumn(
                name: "ShopId",
                table: "Bills");

            migrationBuilder.RenameColumn(
                name: "VoucherId",
                table: "Bills",
                newName: "ProductId");

            migrationBuilder.AddColumn<Guid>(
                name: "ShippingVoucherId",
                table: "ItemInCarts",
                type: "char(36)",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                collation: "ascii_general_ci");

            migrationBuilder.AddColumn<Guid>(
                name: "VoucherId",
                table: "ItemInCarts",
                type: "char(36)",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                collation: "ascii_general_ci");

            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "Bills",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Bills_ProductId",
                table: "Bills",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bills_Products_ProductId",
                table: "Bills",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "ProductId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
