using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ContactsApp.Migrations
{
    /// <inheritdoc />
    public partial class subcategoriesnull : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contacts_Subcategory_FKSubcategory",
                table: "Contacts");

            migrationBuilder.DropForeignKey(
                name: "FK_Subcategory_Categories_FKCategory",
                table: "Subcategory");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Subcategory",
                table: "Subcategory");

            migrationBuilder.RenameTable(
                name: "Subcategory",
                newName: "Subcategories");

            migrationBuilder.RenameIndex(
                name: "IX_Subcategory_FKCategory",
                table: "Subcategories",
                newName: "IX_Subcategories_FKCategory");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Subcategories",
                table: "Subcategories",
                column: "Id");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contacts_Subcategories_FKSubcategory",
                table: "Contacts");

            migrationBuilder.DropForeignKey(
                name: "FK_Subcategories_Categories_FKCategory",
                table: "Subcategories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Subcategories",
                table: "Subcategories");

            migrationBuilder.RenameTable(
                name: "Subcategories",
                newName: "Subcategory");

            migrationBuilder.RenameIndex(
                name: "IX_Subcategories_FKCategory",
                table: "Subcategory",
                newName: "IX_Subcategory_FKCategory");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Subcategory",
                table: "Subcategory",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Contacts_Subcategory_FKSubcategory",
                table: "Contacts",
                column: "FKSubcategory",
                principalTable: "Subcategory",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Subcategory_Categories_FKCategory",
                table: "Subcategory",
                column: "FKCategory",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
