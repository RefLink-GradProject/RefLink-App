using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace refLinkApi.Migrations
{
    /// <inheritdoc />
    public partial class NewRef : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ReferencerId",
                table: "Responses",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Responses_ReferencerId",
                table: "Responses",
                column: "ReferencerId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Responses_Referencers_ReferencerId",
                table: "Responses",
                column: "ReferencerId",
                principalTable: "Referencers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Responses_Referencers_ReferencerId",
                table: "Responses");

            migrationBuilder.DropIndex(
                name: "IX_Responses_ReferencerId",
                table: "Responses");

            migrationBuilder.DropColumn(
                name: "ReferencerId",
                table: "Responses");
        }
    }
}
