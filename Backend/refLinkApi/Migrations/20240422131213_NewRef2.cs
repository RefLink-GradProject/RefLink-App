using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace refLinkApi.Migrations
{
    /// <inheritdoc />
    public partial class NewRef2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Postings_Employers_EmployerId",
                table: "Postings");

            migrationBuilder.DropForeignKey(
                name: "FK_Questions_Postings_PostingId",
                table: "Questions");

            migrationBuilder.DropForeignKey(
                name: "FK_Referencers_Candidates_CandidateId",
                table: "Referencers");

            migrationBuilder.DropForeignKey(
                name: "FK_Responses_Questions_QuestionId",
                table: "Responses");

            migrationBuilder.DropForeignKey(
                name: "FK_Responses_Referencers_ReferencerId",
                table: "Responses");

            migrationBuilder.DropIndex(
                name: "IX_Responses_ReferencerId",
                table: "Responses");

            migrationBuilder.DropColumn(
                name: "ReferencerId",
                table: "Responses");

            migrationBuilder.AlterColumn<int>(
                name: "QuestionId",
                table: "Responses",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "CandidateId",
                table: "Referencers",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "ResponseId",
                table: "Referencers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "PostingId",
                table: "Questions",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "EmployerId",
                table: "Postings",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_Referencers_ResponseId",
                table: "Referencers",
                column: "ResponseId");

            migrationBuilder.AddForeignKey(
                name: "FK_Postings_Employers_EmployerId",
                table: "Postings",
                column: "EmployerId",
                principalTable: "Employers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Questions_Postings_PostingId",
                table: "Questions",
                column: "PostingId",
                principalTable: "Postings",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Referencers_Candidates_CandidateId",
                table: "Referencers",
                column: "CandidateId",
                principalTable: "Candidates",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Referencers_Responses_ResponseId",
                table: "Referencers",
                column: "ResponseId",
                principalTable: "Responses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Responses_Questions_QuestionId",
                table: "Responses",
                column: "QuestionId",
                principalTable: "Questions",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Postings_Employers_EmployerId",
                table: "Postings");

            migrationBuilder.DropForeignKey(
                name: "FK_Questions_Postings_PostingId",
                table: "Questions");

            migrationBuilder.DropForeignKey(
                name: "FK_Referencers_Candidates_CandidateId",
                table: "Referencers");

            migrationBuilder.DropForeignKey(
                name: "FK_Referencers_Responses_ResponseId",
                table: "Referencers");

            migrationBuilder.DropForeignKey(
                name: "FK_Responses_Questions_QuestionId",
                table: "Responses");

            migrationBuilder.DropIndex(
                name: "IX_Referencers_ResponseId",
                table: "Referencers");

            migrationBuilder.DropColumn(
                name: "ResponseId",
                table: "Referencers");

            migrationBuilder.AlterColumn<int>(
                name: "QuestionId",
                table: "Responses",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ReferencerId",
                table: "Responses",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "CandidateId",
                table: "Referencers",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "PostingId",
                table: "Questions",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "EmployerId",
                table: "Postings",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Responses_ReferencerId",
                table: "Responses",
                column: "ReferencerId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Postings_Employers_EmployerId",
                table: "Postings",
                column: "EmployerId",
                principalTable: "Employers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Questions_Postings_PostingId",
                table: "Questions",
                column: "PostingId",
                principalTable: "Postings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Referencers_Candidates_CandidateId",
                table: "Referencers",
                column: "CandidateId",
                principalTable: "Candidates",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Responses_Questions_QuestionId",
                table: "Responses",
                column: "QuestionId",
                principalTable: "Questions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Responses_Referencers_ReferencerId",
                table: "Responses",
                column: "ReferencerId",
                principalTable: "Referencers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
