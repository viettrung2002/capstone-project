using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CoreBuyNow.Migrations
{
    /// <inheritdoc />
    public partial class FixCategory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SubCategoryAttributes_ProductAttributes_ProductAttributeAttr~",
                table: "SubCategoryAttributes");

            migrationBuilder.DropIndex(
                name: "IX_SubCategoryAttributes_ProductAttributeAttributeId",
                table: "SubCategoryAttributes");

            migrationBuilder.DropColumn(
                name: "ProductAttributeAttributeId",
                table: "SubCategoryAttributes");

            migrationBuilder.CreateIndex(
                name: "IX_SubCategoryAttributes_AttributeId",
                table: "SubCategoryAttributes",
                column: "AttributeId");

            migrationBuilder.AddForeignKey(
                name: "FK_SubCategoryAttributes_ProductAttributes_AttributeId",
                table: "SubCategoryAttributes",
                column: "AttributeId",
                principalTable: "ProductAttributes",
                principalColumn: "AttributeId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SubCategoryAttributes_ProductAttributes_AttributeId",
                table: "SubCategoryAttributes");

            migrationBuilder.DropIndex(
                name: "IX_SubCategoryAttributes_AttributeId",
                table: "SubCategoryAttributes");

            migrationBuilder.AddColumn<Guid>(
                name: "ProductAttributeAttributeId",
                table: "SubCategoryAttributes",
                type: "char(36)",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                collation: "ascii_general_ci");

            migrationBuilder.CreateIndex(
                name: "IX_SubCategoryAttributes_ProductAttributeAttributeId",
                table: "SubCategoryAttributes",
                column: "ProductAttributeAttributeId");

            migrationBuilder.AddForeignKey(
                name: "FK_SubCategoryAttributes_ProductAttributes_ProductAttributeAttr~",
                table: "SubCategoryAttributes",
                column: "ProductAttributeAttributeId",
                principalTable: "ProductAttributes",
                principalColumn: "AttributeId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
