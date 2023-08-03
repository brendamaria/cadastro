using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Model;

public class pessoa
{
    public int Id { get; set; }
    public string TipoPessoa { get; set; }
    public string? NomeRazaoSocial { get; set; }
    public string? CpfCnpj { get; set; }
    public string Telefone { get; set; }
    public string? Email { get; set; }
    public virtual ICollection<endereco> Enderecos { get; set; }
}
