using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ContactsApp.Migrations
{
    /// <inheritdoc />
    public partial class subcategories : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FKSubcategory",
                table: "Contacts",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Subcategory",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    FKCategory = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Subcategory", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Subcategory_Categories_FKCategory",
                        column: x => x.FKCategory,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Contacts_FKSubcategory",
                table: "Contacts",
                column: "FKSubcategory");

            migrationBuilder.CreateIndex(
                name: "IX_Subcategory_FKCategory",
                table: "Subcategory",
                column: "FKCategory");

            migrationBuilder.AddForeignKey(
                name: "FK_Contacts_Subcategory_FKSubcategory",
                table: "Contacts",
                column: "FKSubcategory",
                principalTable: "Subcategory",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contacts_Subcategory_FKSubcategory",
                table: "Contacts");

            migrationBuilder.DropTable(
                name: "Subcategory");

            migrationBuilder.DropIndex(
                name: "IX_Contacts_FKSubcategory",
                table: "Contacts");

            migrationBuilder.DropColumn(
                name: "FKSubcategory",
                table: "Contacts");
        }
    }
}
