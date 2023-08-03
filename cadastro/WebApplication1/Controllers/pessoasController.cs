using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Infra;
using WebApplication1.Model;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class pessoasController : ControllerBase
    {
        private readonly CadastroContext _context;

        public pessoasController(CadastroContext context)
        {
            _context = context;
        }

        // GET: api/pessoas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<pessoa>>> Getpessoas()
        {
          if (_context.pessoas == null)
          {
              return NotFound();
          }
            return await _context.pessoas.Include(i=>i.Enderecos).ToListAsync();   
        }

        // GET: api/pessoas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<pessoa>> Getpessoa(int id)
        {
          if (_context.pessoas == null)
          {
              return NotFound();
          }
            // var pessoa = await _context.pessoas.FindAsync(id);
            var pessoa = await _context.pessoas.Include(i=>i.Enderecos).FirstOrDefaultAsync(p=>p.Id == id);
            if (pessoa == null)
            {
                return NotFound();
            }

            return pessoa;
        }

        // PUT: api/pessoas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut]
        public async Task<IActionResult> Putpessoa(pessoa pessoa)
        {

            _context.Entry(pessoa).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!pessoaExists(pessoa.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/pessoas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<pessoa>> Postpessoa(pessoa pessoa)
        {
          if (_context.pessoas == null)
          {
              return Problem("Entity set 'CadastroContext.pessoas'  is null.");
          }
            _context.pessoas.Add(pessoa);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getpessoa", new { id = pessoa.Id }, pessoa);
        }

        // DELETE: api/pessoas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Deletepessoa(int id)
        {
            if (_context.pessoas == null)
            {
                return NotFound();
            }
            var pessoa = await _context.pessoas.FindAsync(id);
            if (pessoa == null)
            {
                return NotFound();
            }

            _context.pessoas.Remove(pessoa);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool pessoaExists(int id)
        {
            return (_context.pessoas?.Any(e => e.Id == id)).GetValueOrDefault();
        }



        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<pessoa>>> SearchPessoas(string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                return BadRequest("Name parameter is required.");
            }
    
            var pessoas = await _context.pessoas
                .Include(i => i.Enderecos)
                .Where(p => p.NomeRazaoSocial.Contains(name))
                .ToListAsync();

            if (pessoas == null || pessoas.Count == 0)
            {
                return NotFound();
            }

            return pessoas;
        }   
    }
}
