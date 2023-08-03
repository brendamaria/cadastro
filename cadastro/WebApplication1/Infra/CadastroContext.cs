using Microsoft.EntityFrameworkCore;
using WebApplication1.Model;

namespace WebApplication1.Infra;

public class CadastroContext : DbContext
{
    public CadastroContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
    {

    }

    public DbSet<endereco> enderecos { get; set; }

    public DbSet<pessoa> pessoas { get; set; }
    
}
