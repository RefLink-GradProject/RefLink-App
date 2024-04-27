using Microsoft.EntityFrameworkCore;
using refLinkApi.Dtos;
using refLinkApi.Dtos.Mappers;
using refLinkApi.Models;

namespace refLinkApi.Services;

public class RatingQuestionService : IRatingQuestionService
{
    private readonly RefLinkContext _context;
    private readonly MapperlyMapper mapper;

    public RatingQuestionService(RefLinkContext context)
    {
        _context = context;
        mapper = new MapperlyMapper();
    }
    
    public async Task<RatingQuestionResponseDto> PostNewQuestion(RatingQuestionRequestDto questionRequestDto)
    {
        if (_context.RatingQuestions == null)
        {
            return null;
        }
        
        var question = mapper.RatingQuestionRequestDtoToRatingQuestion(questionRequestDto);
        _context.RatingQuestions.Add(question);
        await _context.SaveChangesAsync();

        return mapper.RatingQuestionToRatingQuestionResponseDto(question);
    }

    public async Task<List<RatingQuestionResponseDto>> GetQuestions()
    {
        if (_context.RatingQuestions is null)
        {
            return null;
        }

        var questions = await _context.RatingQuestions.ToListAsync();
        List<RatingQuestionResponseDto> questionResponseDtos = [];
        foreach (RatingQuestion question in questions)
        {
            questionResponseDtos.Add(mapper.RatingQuestionToRatingQuestionResponseDto(question));
        }
        return questionResponseDtos;
    }

    public async Task<RatingQuestionResponseDto> GetQuestionByGuid(Guid guidId)
    {
        if (_context.RatingQuestions is null)
        {
            return null;
        }

        var question = await _context.RatingQuestions.FirstOrDefaultAsync(r => r.GuidId == guidId);
        return mapper.RatingQuestionToRatingQuestionResponseDto(question);
    }
}