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

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CandidateResponseDto>>> GetAllCandidates()
        {
            return await _service.GetCandidates();
        }

        [HttpGet("{guidId}")]
        public async Task<ActionResult<CandidateResponseDto>> GetCandidate(Guid guidId)
        {
            var candidate = await _service.GetCandidateByGuid(guidId);

            if (candidate == null)
            {
                return NotFound();
            }

            return candidate;
        }
    }
}
