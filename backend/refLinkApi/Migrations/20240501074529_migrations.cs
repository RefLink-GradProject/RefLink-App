﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace refLinkApi.Migrations
{
    /// <inheritdoc />
    public partial class migrations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Employers",
                columns: table => new
                {
                    GuidId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AuthId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Company = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employers", x => x.GuidId);
                });

            migrationBuilder.CreateTable(
                name: "Postings",
                columns: table => new
                {
                    GuidId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Id = table.Column<int>(type: "int", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EmployerGuid = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Postings", x => x.GuidId);
                    table.ForeignKey(
                        name: "FK_Postings_Employers_EmployerGuid",
                        column: x => x.EmployerGuid,
                        principalTable: "Employers",
                        principalColumn: "GuidId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Candidates",
                columns: table => new
                {
                    GuidId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Id = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PostingGuid = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Candidates", x => x.GuidId);
                    table.ForeignKey(
                        name: "FK_Candidates_Postings_PostingGuid",
                        column: x => x.PostingGuid,
                        principalTable: "Postings",
                        principalColumn: "GuidId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Questions",
                columns: table => new
                {
                    GuidId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Id = table.Column<int>(type: "int", nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PostingGuid = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Questions", x => x.GuidId);
                    table.ForeignKey(
                        name: "FK_Questions_Postings_PostingGuid",
                        column: x => x.PostingGuid,
                        principalTable: "Postings",
                        principalColumn: "GuidId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Referencers",
                columns: table => new
                {
                    GuidId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Id = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CandidateGuid = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Referencers", x => x.GuidId);
                    table.ForeignKey(
                        name: "FK_Referencers_Candidates_CandidateGuid",
                        column: x => x.CandidateGuid,
                        principalTable: "Candidates",
                        principalColumn: "GuidId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Responses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GuidId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    QuestionGuid = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ReferencerGuid = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Responses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Responses_Questions_QuestionGuid",
                        column: x => x.QuestionGuid,
                        principalTable: "Questions",
                        principalColumn: "GuidId");
                    table.ForeignKey(
                        name: "FK_Responses_Referencers_ReferencerGuid",
                        column: x => x.ReferencerGuid,
                        principalTable: "Referencers",
                        principalColumn: "GuidId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Candidates_PostingGuid",
                table: "Candidates",
                column: "PostingGuid");

            migrationBuilder.CreateIndex(
                name: "IX_Postings_EmployerGuid",
                table: "Postings",
                column: "EmployerGuid");

            migrationBuilder.CreateIndex(
                name: "IX_Questions_PostingGuid",
                table: "Questions",
                column: "PostingGuid");

            migrationBuilder.CreateIndex(
                name: "IX_Referencers_CandidateGuid",
                table: "Referencers",
                column: "CandidateGuid");

            migrationBuilder.CreateIndex(
                name: "IX_Responses_QuestionGuid",
                table: "Responses",
                column: "QuestionGuid");

            migrationBuilder.CreateIndex(
                name: "IX_Responses_ReferencerGuid",
                table: "Responses",
                column: "ReferencerGuid");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Responses");

            migrationBuilder.DropTable(
                name: "Questions");

            migrationBuilder.DropTable(
                name: "Referencers");

            migrationBuilder.DropTable(
                name: "Candidates");

            migrationBuilder.DropTable(
                name: "Postings");

            migrationBuilder.DropTable(
                name: "Employers");
        }
    }
}
