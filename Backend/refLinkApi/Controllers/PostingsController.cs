using Microsoft.AspNetCore.Mvc;
using refLinkApi.Dtos;
using refLinkApi.Services;

namespace refLinkApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostingsController : ControllerBase
    {
        private readonly IPostingService _service;

        public PostingsController(IPostingService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<ActionResult<PostingResponseDto>> PostPosting(PostingRequestDto candidateRequestDto)
        {
            var result = await _service.PostNewPosting(candidateRequestDto);
            if (result is null)
            {
                return NotFound();
            }
            return CreatedAtAction("GetPosting", new { GuidId = result.GuidId }, result);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PostingResponseDto>>> GetAllPostings()
        {
            return await _service.GetPostings();
        }

        [HttpGet("{guidId}")]
        public async Task<ActionResult<PostingResponseDto>> GetPosting(Guid guidId)
        {
            var posting = await _service.GetPostingByGuid(guidId);

            if (posting == null)
            {
                return NotFound();
            }

            return posting;
        }
    }
}