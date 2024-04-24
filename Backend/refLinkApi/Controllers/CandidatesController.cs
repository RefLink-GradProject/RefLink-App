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
    public class CandidatesController : ControllerBase
    {
        private readonly ICandidateService _service;

        public CandidatesController(ICandidateService service)
        {
            _service = service;
        }

        // POST: api/Employers
        [HttpPost]
        public async Task<ActionResult<CandidateResponseDto>> PostCandidate(CandidateRequestDto candidateRequestDto)
        {
            var result = await _service.PostNewCandidate(candidateRequestDto);
            if (result is null)
            {
                return NotFound();
            }
            return CreatedAtAction("GetCandidate", new { GuidId = result.GuidId }, result);
        }

        // GET: api/Employers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CandidateResponseDto>>> GetAllCandidates()
        {
            return await _service.GetCandidates();
        }

        // GET: api/Employers/5
        [HttpGet("{guidId}")]
        public async Task<ActionResult<CandidateResponseDto>> GetCandidate(Guid guidId)
        {
            var candidate = await _service.GetCandidateById(guidId);

            if (candidate == null)
            {
                return NotFound();
            }

            return candidate;
        }

        // // PUT: api/Candidates/5
        // // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        // [HttpPut("{id}")]
        // public async Task<IActionResult> PutCandidate(int id, Candidate candidate)
        // {
        //     if (id != candidate.Id)
        //     {
        //         return BadRequest();
        //     }

        //     _context.Entry(candidate).State = EntityState.Modified;

        //     try
        //     {
        //         await _context.SaveChangesAsync();
        //     }
        //     catch (DbUpdateConcurrencyException)
        //     {
        //         if (!CandidateExists(id))
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

        // // DELETE: api/Candidates/5
        // [HttpDelete("{id}")]
        // public async Task<IActionResult> DeleteCandidate(int id)
        // {
        //     var candidate = await _context.Candidates.FindAsync(id);
        //     if (candidate == null)
        //     {
        //         return NotFound();
        //     }

        //     _context.Candidates.Remove(candidate);
        //     await _context.SaveChangesAsync();

        //     return NoContent();
        // }

        // private bool CandidateExists(int id)
        // {
        //     return _context.Candidates.Any(e => e.Id == id);
        // }
    }
}
