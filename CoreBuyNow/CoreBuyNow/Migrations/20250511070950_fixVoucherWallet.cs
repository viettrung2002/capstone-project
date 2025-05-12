using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CoreBuyNow.Migrations
{
    /// <inheritdoc />
    public partial class fixVoucherWallet : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Vouchers_VoucherWallets_VoucherWalletId",
                table: "Vouchers");

            migrationBuilder.DropIndex(
                name: "IX_Vouchers_VoucherWalletId",
                table: "Vouchers");

            migrationBuilder.DropColumn(
                name: "VoucherWalletId",
                table: "Vouchers");

            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "VoucherWallets",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<Guid>(
                name: "VoucherId",
                table: "VoucherWallets",
                type: "char(36)",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                collation: "ascii_general_ci");

            migrationBuilder.CreateIndex(
                name: "IX_VoucherWallets_VoucherId",
                table: "VoucherWallets",
                column: "VoucherId");

            migrationBuilder.AddForeignKey(
                name: "FK_VoucherWallets_Vouchers_VoucherId",
                table: "VoucherWallets",
                column: "VoucherId",
                principalTable: "Vouchers",
                principalColumn: "VoucherId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VoucherWallets_Vouchers_VoucherId",
                table: "VoucherWallets");

            migrationBuilder.DropIndex(
                name: "IX_VoucherWallets_VoucherId",
                table: "VoucherWallets");

            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "VoucherWallets");

            migrationBuilder.DropColumn(
                name: "VoucherId",
                table: "VoucherWallets");

            migrationBuilder.AddColumn<Guid>(
                name: "VoucherWalletId",
                table: "Vouchers",
                type: "char(36)",
                nullable: true,
                collation: "ascii_general_ci");

            migrationBuilder.CreateIndex(
                name: "IX_Vouchers_VoucherWalletId",
                table: "Vouchers",
                column: "VoucherWalletId");

            migrationBuilder.AddForeignKey(
                name: "FK_Vouchers_VoucherWallets_VoucherWalletId",
                table: "Vouchers",
                column: "VoucherWalletId",
                principalTable: "VoucherWallets",
                principalColumn: "VoucherWalletId");
        }
    }
}
