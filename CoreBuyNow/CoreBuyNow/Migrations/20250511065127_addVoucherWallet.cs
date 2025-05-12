using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CoreBuyNow.Migrations
{
    /// <inheritdoc />
    public partial class addVoucherWallet : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "VoucherWalletId",
                table: "Vouchers",
                type: "char(36)",
                nullable: true,
                collation: "ascii_general_ci");

            migrationBuilder.CreateTable(
                name: "VoucherWallets",
                columns: table => new
                {
                    VoucherWalletId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    CustomerId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VoucherWallets", x => x.VoucherWalletId);
                    table.ForeignKey(
                        name: "FK_VoucherWallets_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Customers",
                        principalColumn: "CustomerId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Vouchers_VoucherWalletId",
                table: "Vouchers",
                column: "VoucherWalletId");

            migrationBuilder.CreateIndex(
                name: "IX_VoucherWallets_CustomerId",
                table: "VoucherWallets",
                column: "CustomerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Vouchers_VoucherWallets_VoucherWalletId",
                table: "Vouchers",
                column: "VoucherWalletId",
                principalTable: "VoucherWallets",
                principalColumn: "VoucherWalletId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Vouchers_VoucherWallets_VoucherWalletId",
                table: "Vouchers");

            migrationBuilder.DropTable(
                name: "VoucherWallets");

            migrationBuilder.DropIndex(
                name: "IX_Vouchers_VoucherWalletId",
                table: "Vouchers");

            migrationBuilder.DropColumn(
                name: "VoucherWalletId",
                table: "Vouchers");
        }
    }
}
