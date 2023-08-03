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
    public class enderecoesController : ControllerBase
    {
        private readonly CadastroContext _context;

        public enderecoesController(CadastroContext context)
        {
            _context = context;
        }

        // GET: api/enderecoes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<endereco>>> Getenderecos()
        {
          if (_context.enderecos == null)
          {
              return NotFound();
          }
            return await _context.enderecos.ToListAsync();
        }

        // GET: api/enderecoes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<endereco>> Getendereco(int id)
        {
          if (_context.enderecos == null)
          {
              return NotFound();
          }
            var endereco = await _context.enderecos.FindAsync(id);

            if (endereco == null)
            {
                return NotFound();
            }

            return endereco;
        }

        // PUT: api/enderecoes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> Putendereco(int id, endereco endereco)
        {
            if (id != endereco.Id)
            {
                return BadRequest();
            }

            _context.Entry(endereco).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!enderecoExists(id))
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

        // POST: api/enderecoes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<endereco>> Postendereco(endereco endereco)
        {
          if (_context.enderecos == null)
          {
              return Problem("Entity set 'CadastroContext.enderecos'  is null.");
          }
            _context.enderecos.Add(endereco);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getendereco", new { id = endereco.Id }, endereco);
        }

        // DELETE: api/enderecoes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Deleteendereco(int id)
        {
            if (_context.enderecos == null)
            {
                return NotFound();
            }
            var endereco = await _context.enderecos.FindAsync(id);
            if (endereco == null)
            {
                return NotFound();
            }

            _context.enderecos.Remove(endereco);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool enderecoExists(int id)
        {
            return (_context.enderecos?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
