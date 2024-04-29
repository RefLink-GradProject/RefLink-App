using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
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
    public class EmployersController(EmployerService service) : ControllerBase
    {
        private readonly EmployerService _service = service;

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> EmployerHasAccount()
        {
            var employer = await service.GetEmployerByAuthID(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            if (employer == null)
            {
                return NotFound();
            }
            return Ok(employer);
        }
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateEmployerAccount(EmployerRequestDto dto)
        {
            var employer = await service.GetEmployerByAuthID(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            if (employer != null)
            {
                return BadRequest();
            }

            var createEmployer  = await service.CreateEmployerFromClaims(User, dto);
            return Ok(createEmployer);
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
        
    }
}
