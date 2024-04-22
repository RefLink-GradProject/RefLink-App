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
    public class EmployersController : ControllerBase
    {
        private readonly RefLinkContext _context;

        public EmployersController(RefLinkContext context)
        {
            _context = context;
        }

        // GET: api/Employers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employer>>> GetEmployer()
        {
            return await _context.Employers.Include(e => e.Postings).ToListAsync();
        }

        // GET: api/Employers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Employer>> GetEmployer(int id)
        {
            var employer = await _context.Employers.FindAsync(id);

            if (employer == null)
            {
                return NotFound();
            }

            return employer;
        }

        // PUT: api/Employers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployer(int id, Employer employer)
        {
            if (id != employer.Id)
            {
                return BadRequest();
            }

            _context.Entry(employer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployerExists(id))
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

        // POST: api/Employers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Employer>> PostEmployer(Employer employer)
        {
            _context.Employers.Add(employer);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmployer", new { id = employer.Id }, employer);
        }

        // DELETE: api/Employers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployer(int id)
        {
            var employer = await _context.Employers.FindAsync(id);
            if (employer == null)
            {
                return NotFound();
            }

            _context.Employers.Remove(employer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EmployerExists(int id)
        {
            return _context.Employers.Any(e => e.Id == id);
        }
    }
}
