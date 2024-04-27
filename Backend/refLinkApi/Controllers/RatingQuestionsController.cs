using Microsoft.AspNetCore.Mvc;
using refLinkApi.Dtos;
using refLinkApi.Services;

namespace refLinkApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class RatingQuestionsController : ControllerBase
{
    private readonly IQuestionService _service;

    public RatingQuestionsController(IQuestionService service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task<ActionResult<QuestionResponseDto>> PostQuestion(QuestionRequestDto questionRequestDto)
    {
        var result = await _service.PostNewQuestion(questionRequestDto);
        if (result is null)
        {
            return NotFound();
        }
        return CreatedAtAction("GetQuestion", new { GuidId = result.GuidId }, result);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<QuestionResponseDto>>> GetAllQuestions()
    {
        return await _service.GetQuestions();
    }

    [HttpGet("{guidId}")]
    public async Task<ActionResult<QuestionResponseDto>> GetQuestion(Guid guidId)
    {
        var question = await _service.GetQuestionByGuid(guidId);

        if (question == null)
        {
            return NotFound();
        }

        return question;
    }
}
