namespace WebApplication1.Model;

public class endereco
{
    public int Id { get; set; }
    public string TipoEndereco { get; set; }
    public int? Numero { get; set; }
    public string? Complemento { get; set; }
    public string Bairro { get; set; }
    public string Cep { get; set; }
    public string Cidade { get; set; }
    public string Uf { get; set; }

}
