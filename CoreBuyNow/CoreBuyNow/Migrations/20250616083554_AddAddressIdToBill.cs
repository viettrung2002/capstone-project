using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CoreBuyNow.Migrations
{
    /// <inheritdoc />
    public partial class AddAddressIdToBill : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            
            migrationBuilder.AddColumn<Guid>(
                name: "AddressId",
                table: "Bills",
                type: "char(36)",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                collation: "ascii_general_ci");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_BillId",
                table: "Notifications",
                column: "BillId");

            migrationBuilder.CreateIndex(
                name: "IX_Bills_AddressId",
                table: "Bills",
                column: "AddressId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bills_Addresses_AddressId",
                table: "Bills",
                column: "AddressId",
                principalTable: "Addresses",
                principalColumn: "AddressId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_Bills_BillId",
                table: "Notifications",
                column: "BillId",
                principalTable: "Bills",
                principalColumn: "BillId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bills_Addresses_AddressId",
                table: "Bills");

            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_Bills_BillId",
                table: "Notifications");

            migrationBuilder.DropIndex(
                name: "IX_Notifications_BillId",
                table: "Notifications");

            migrationBuilder.DropIndex(
                name: "IX_Bills_AddressId",
                table: "Bills");

            migrationBuilder.DropColumn(
                name: "AddressId",
                table: "Bills");

            migrationBuilder.CreateTable(
                name: "CustomerInteractions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CustomerId = table.Column<Guid>(type: "char(36)", nullable: true, collation: "ascii_general_ci"),
                    ProductId1 = table.Column<Guid>(type: "char(36)", nullable: true, collation: "ascii_general_ci"),
                    IsPurchase = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomerInteractions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CustomerInteractions_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Customers",
                        principalColumn: "CustomerId");
                    table.ForeignKey(
                        name: "FK_CustomerInteractions_Products_ProductId1",
                        column: x => x.ProductId1,
                        principalTable: "Products",
                        principalColumn: "ProductId");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_CustomerInteractions_CustomerId",
                table: "CustomerInteractions",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_CustomerInteractions_ProductId",
                table: "CustomerInteractions",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_CustomerInteractions_ProductId1",
                table: "CustomerInteractions",
                column: "ProductId1");

            migrationBuilder.CreateIndex(
                name: "IX_CustomerInteractions_UserId",
                table: "CustomerInteractions",
                column: "UserId");
        }
    }
}
