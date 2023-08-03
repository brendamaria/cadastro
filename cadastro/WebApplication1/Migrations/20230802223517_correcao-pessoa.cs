using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApplication1.Migrations
{
    /// <inheritdoc />
    public partial class correcaopessoa : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Cnpj",
                table: "pessoas");

            migrationBuilder.DropColumn(
                name: "Cpf",
                table: "pessoas");

            migrationBuilder.RenameColumn(
                name: "RazaoSocial",
                table: "pessoas",
                newName: "NomeRazaoSocial");

            migrationBuilder.RenameColumn(
                name: "Nome",
                table: "pessoas",
                newName: "CpfCnpj");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "NomeRazaoSocial",
                table: "pessoas",
                newName: "RazaoSocial");

            migrationBuilder.RenameColumn(
                name: "CpfCnpj",
                table: "pessoas",
                newName: "Nome");

            migrationBuilder.AddColumn<string>(
                name: "Cnpj",
                table: "pessoas",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Cpf",
                table: "pessoas",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
