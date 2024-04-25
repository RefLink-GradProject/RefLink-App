using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using refLinkApi.Dtos;
using refLinkApi.Models;
using refLinkApi.Services;

namespace refLinkApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployersController : ControllerBase
    {
        private readonly EmployerService _service;

        public EmployersController(EmployerService service)
        {
            _service = service;
        }
        

        // GET: api/Employers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EmployerResponseDto>> GetEmployer(Guid guidId)
        {
            var employer = await _service.GetEmployerById(guidId);

            if (employer == null)
            {
                return NotFound();
            }

            return employer;
        }

        // // PUT: api/Employers/5
        // // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        // [HttpPut("{id}")]
        // public async Task<IActionResult> PutEmployer(int id, Employer employer)
        // {
        //     if (id != employer.Id)
        //     {
        //         return BadRequest();
        //     }

        //     _context.Entry(employer).State = EntityState.Modified;

        //     try
        //     {
        //         await _context.SaveChangesAsync();
        //     }
        //     catch (DbUpdateConcurrencyException)
        //     {
        //         if (!EmployerExists(id))
        //         {
        //             return NotFound();
        //         }
        //         else
        //         {
        //             throw;
        //         }
        //     }

        //     return NoContent();
        // }


        // // DELETE: api/Employers/5
        // [HttpDelete("{id}")]
        // public async Task<IActionResult> DeleteEmployer(int id)
        // {
        //     var employer = await _context.Employers.FindAsync(id);
        //     if (employer == null)
        //     {
        //         return NotFound();
        //     }

        //     _context.Employers.Remove(employer);
        //     await _context.SaveChangesAsync();

        //     return NoContent();
        // }

        // private bool EmployerExists(int id)
        // {
        //     return _context.Employers.Any(e => e.Id == id);
        // }
    }
}
