using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using refLinkApi.Dtos;
using refLinkApi.Dtos.Mappers;
using refLinkApi.Models;

namespace refLinkApi.Services;

public class ReferencerService : IReferencerService
{
    private readonly RefLinkContext _context;
    private readonly MapperlyMapper mapper;

    public ReferencerService(RefLinkContext context)
    {
        _context = context;
        mapper = new MapperlyMapper();
    }
    
    public async Task<ReferencerResponseDto> PostNewReferencer(ReferencerRequestDto referencerRequestDto)
    {
        if (_context.Referencers == null)
        {
            return null;
        }
        
        var referencer = mapper.ReferencerRequestDtoToReferencer(referencerRequestDto);
        _context.Referencers.Add(referencer);
        await _context.SaveChangesAsync();

        return mapper.ReferencerToReferencerResponseDto(referencer);
    }

    public async Task<List<ReferencerResponseDto>> GetReferencers()
    {
        if (_context.Referencers is null)
        {
            return null;
        }

        var referencers = await _context.Referencers.ToListAsync();
        List<ReferencerResponseDto> referencerResponseDtos = [];
        foreach (Referencer referencer in referencers)
        {
            referencerResponseDtos.Add(mapper.ReferencerToReferencerResponseDto(referencer));
        }
        return referencerResponseDtos;
    }

    public async Task<ReferencerResponseDto> GetReferencerByGuid(Guid guidId)
    {
        if (_context.Referencers is null)
        {
            return null;
        }

        var referencer = await _context.Referencers.FirstOrDefaultAsync(r => r.GuidId == guidId);
        return mapper.ReferencerToReferencerResponseDto(referencer);
    }

    public async Task<ActionResult<ReferencerWithQuestionsResponseDto>> GetQuestionsByReferencerGuid(Guid guidId)
    {
        var referencer = await _context.Referencers
            .Include(referencer => referencer.Candidate)
            .ThenInclude(candidate => candidate.Posting)
            .ThenInclude(posting => posting.Questions)
            .FirstOrDefaultAsync(referencer => referencer.GuidId == guidId);

        var questions = referencer.Candidate.Posting.Questions;

        if (questions is null)
        {
            return null;
        }
        
        List<QuestionResponseDto> questionResponseDtos = [];

        foreach (var question in questions)
        {
            questionResponseDtos.Add(mapper.QuestionToQuestionResponseDto(question));
        }

        var referencerWithQuestionsResponse = new ReferencerWithQuestionsResponseDto()
        {
            Referencer = mapper.ReferencerToReferencerResponseDto(referencer),
            Questions = questionResponseDtos
        };

        return referencerWithQuestionsResponse;
    }
}