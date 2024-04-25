using Microsoft.AspNetCore.Mvc;
using refLinkApi.Dtos;
using refLinkApi.Services;

namespace refLinkApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReferencersController : ControllerBase
    {
        private readonly IReferencerService _service;

        public ReferencersController(IReferencerService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<ActionResult<ReferencerResponseDto>> PostReferencer(ReferencerRequestDto referencerRequestDto)
        {
            var result = await _service.PostNewReferencer(referencerRequestDto);
            if (result is null)
            {
                return NotFound();
            }
            return CreatedAtAction("GetReferencer", new { GuidId = result.GuidId }, result);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReferencerResponseDto>>> GetAllReferencers()
        {
            return await _service.GetReferencers();
        }

        [HttpGet("{guidId}")]
        public async Task<ActionResult<ReferencerResponseDto>> GetReferencer(Guid guidId)
        {
            var referencer = await _service.GetReferencerByGuid(guidId);

            if (referencer == null)
            {
                return NotFound();
            }

            return referencer;
        }
    }
}