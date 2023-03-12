using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ContactsApp.Migrations
{
    /// <inheritdoc />
    public partial class subcategoriesnull2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contacts_Subcategories_FKSubcategory",
                table: "Contacts");

            migrationBuilder.DropForeignKey(
                name: "FK_Subcategories_Categories_FKCategory",
                table: "Subcategories");

            migrationBuilder.AlterColumn<int>(
                name: "FKCategory",
                table: "Subcategories",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Contacts_Subcategories_FKSubcategory",
                table: "Contacts",
                column: "FKSubcategory",
                principalTable: "Subcategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Subcategories_Categories_FKCategory",
                table: "Subcategories",
                column: "FKCategory",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contacts_Subcategories_FKSubcategory",
                table: "Contacts");

            migrationBuilder.DropForeignKey(
                name: "FK_Subcategories_Categories_FKCategory",
                table: "Subcategories");

            migrationBuilder.AlterColumn<int>(
                name: "FKCategory",
                table: "Subcategories",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Contacts_Subcategories_FKSubcategory",
                table: "Contacts",
                column: "FKSubcategory",
                principalTable: "Subcategories",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Subcategories_Categories_FKCategory",
                table: "Subcategories",
                column: "FKCategory",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
