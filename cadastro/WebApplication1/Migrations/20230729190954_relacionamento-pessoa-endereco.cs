using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApplication1.Migrations
{
    /// <inheritdoc />
    public partial class relacionamentopessoaendereco : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_enderecos_pessoas_pessoaId",
                table: "enderecos");

            migrationBuilder.DropIndex(
                name: "IX_enderecos_pessoaId",
                table: "enderecos");

            migrationBuilder.DropColumn(
                name: "pessoaId",
                table: "enderecos");

            migrationBuilder.AddColumn<int>(
                name: "enderecoId",
                table: "pessoas",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_pessoas_enderecoId",
                table: "pessoas",
                column: "enderecoId");

            migrationBuilder.AddForeignKey(
                name: "FK_pessoas_enderecos_enderecoId",
                table: "pessoas",
                column: "enderecoId",
                principalTable: "enderecos",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_pessoas_enderecos_enderecoId",
                table: "pessoas");

            migrationBuilder.DropIndex(
                name: "IX_pessoas_enderecoId",
                table: "pessoas");

            migrationBuilder.DropColumn(
                name: "enderecoId",
                table: "pessoas");

            migrationBuilder.AddColumn<int>(
                name: "pessoaId",
                table: "enderecos",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_enderecos_pessoaId",
                table: "enderecos",
                column: "pessoaId");

            migrationBuilder.AddForeignKey(
                name: "FK_enderecos_pessoas_pessoaId",
                table: "enderecos",
                column: "pessoaId",
                principalTable: "pessoas",
                principalColumn: "Id");
        }
    }
}
