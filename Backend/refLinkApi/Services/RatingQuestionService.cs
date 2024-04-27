using Microsoft.EntityFrameworkCore;
using refLinkApi.Dtos;
using refLinkApi.Dtos.Mappers;
using refLinkApi.Models;

namespace refLinkApi.Services;

public class RatingQuestionService : IQuestionService
{
    private readonly RefLinkContext _context;
    private readonly MapperlyMapper mapper;

    public RatingQuestionService(RefLinkContext context)
    {
        _context = context;
        mapper = new MapperlyMapper();
    }
    
    public async Task<QuestionResponseDto> PostNewQuestion(QuestionRequestDto questionRequestDto)
    {
        if (_context.RatingQuestions == null)
        {
            return null;
        }
        
        var question = mapper.QuestionRequestDtoToQuestion(questionRequestDto);
        _context.RatingQuestions.Add(question);
        await _context.SaveChangesAsync();

        return mapper.QuestionToQuestionResponseDto(question);
    }

    public async Task<List<QuestionResponseDto>> GetQuestions()
    {
        if (_context.RatingQuestions is null)
        {
            return null;
        }

        var questions = await _context.RatingQuestions.ToListAsync();
        List<QuestionResponseDto> questionResponseDtos = [];
        foreach (Question question in questions)
        {
            questionResponseDtos.Add(mapper.QuestionToQuestionResponseDto(question));
        }
        return questionResponseDtos;
    }

    public async Task<QuestionResponseDto> GetQuestionByGuid(Guid guidId)
    {
        if (_context.RatingQuestions is null)
        {
            return null;
        }

        var question = await _context.RatingQuestions.FirstOrDefaultAsync(r => r.GuidId == guidId);
        return mapper.QuestionToQuestionResponseDto(question);
    }
}