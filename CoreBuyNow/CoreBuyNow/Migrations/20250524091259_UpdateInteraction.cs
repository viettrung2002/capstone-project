using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CoreBuyNow.Migrations
{
    /// <inheritdoc />
    public partial class UpdateInteraction : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<Guid>(
                name: "UserId",
                table: "Interactions",
                type: "char(36)",
                nullable: false,
                collation: "ascii_general_ci",
                oldClrType: typeof(string),
                oldType: "longtext")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Interactions_ProductId",
                table: "Interactions",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_Interactions_Products_ProductId",
                table: "Interactions",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "ProductId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Interactions_Products_ProductId",
                table: "Interactions");

            migrationBuilder.DropIndex(
                name: "IX_Interactions_ProductId",
                table: "Interactions");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "Interactions",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "char(36)")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("Relational:Collation", "ascii_general_ci");
        }
    }
}
