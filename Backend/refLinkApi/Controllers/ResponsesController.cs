using Microsoft.AspNetCore.Mvc;
using refLinkApi.Dtos;
using refLinkApi.Services;

namespace refLinkApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResponsesController : ControllerBase
    {
        private readonly IResponseService _service;

        public ResponsesController(IResponseService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<ActionResult<ResponseResponseDto>> PostResponse(ResponseRequestDto referencerRequestDto)
        {
            var result = await _service.PostNewResponse(referencerRequestDto);
            if (result is null)
            {
                return NotFound();
            }
            return CreatedAtAction("GetResponse", new { GuidId = result.GuidId }, result);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ResponseResponseDto>>> GetAllResponses()
        {
            return await _service.GetResponses();
        }

        [HttpGet("{guidId}")]
        public async Task<ActionResult<ResponseResponseDto>> GetResponse(Guid guidId)
        {
            var referencer = await _service.GetResponseByGuid(guidId);

            if (referencer == null)
            {
                return NotFound();
            }

            return referencer;
        }
    }
}