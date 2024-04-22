using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using refLinkApi.Models;

namespace refLinkApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReferencersController : ControllerBase
    {
        private readonly RefLinkContext _context;

        public ReferencersController(RefLinkContext context)
        {
            _context = context;
        }

        // GET: api/Referencers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Referencer>>> GetReferencers()
        {
            return await _context.Referencers.ToListAsync();
        }

        // GET: api/Referencers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Referencer>> GetReferencer(int id)
        {
            var referencer = await _context.Referencers.FindAsync(id);

            if (referencer == null)
            {
                return NotFound();
            }

            return referencer;
        }

        // PUT: api/Referencers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReferencer(int id, Referencer referencer)
        {
            if (id != referencer.Id)
            {
                return BadRequest();
            }

            _context.Entry(referencer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReferencerExists(id))
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

        // POST: api/Referencers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Referencer>> PostReferencer(Referencer referencer)
        {
            _context.Referencers.Add(referencer);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReferencer", new { id = referencer.Id }, referencer);
        }

        // DELETE: api/Referencers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReferencer(int id)
        {
            var referencer = await _context.Referencers.FindAsync(id);
            if (referencer == null)
            {
                return NotFound();
            }

            _context.Referencers.Remove(referencer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ReferencerExists(int id)
        {
            return _context.Referencers.Any(e => e.Id == id);
        }
    }
}
