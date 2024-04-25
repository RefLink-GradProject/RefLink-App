using Microsoft.EntityFrameworkCore;
using refLinkApi.Dtos;
using refLinkApi.Dtos.Mappers;
using refLinkApi.Models;

namespace refLinkApi.Services;

public class ResponseService : IResponseService
{
    private readonly RefLinkContext _context;
    private readonly MapperlyMapper mapper;

    public ResponseService(RefLinkContext context)
    {
        _context = context;
        mapper = new MapperlyMapper();
    }
    
    public async Task<ResponseResponseDto> PostNewResponse(ResponseRequestDto questionRequestDto)
    {
        if (_context.Responses == null)
        {
            return null;
        }
        
        var question = mapper.ResponseRequestDtoToResponse(questionRequestDto);
        _context.Responses.Add(question);
        await _context.SaveChangesAsync();

        return mapper.ResponseToResponseResponseDto(question);
    }

    public async Task<List<ResponseResponseDto>> GetResponses()
    {
        if (_context.Responses is null)
        {
            return null;
        }

        var questions = await _context.Responses.ToListAsync();
        List<ResponseResponseDto> questionResponseDtos = [];
        foreach (Response question in questions)
        {
            questionResponseDtos.Add(mapper.ResponseToResponseResponseDto(question));
        }
        return questionResponseDtos;
    }

    public async Task<ResponseResponseDto> GetResponseByGuid(Guid guidId)
    {
        if (_context.Responses is null)
        {
            return null;
        }

        var question = await _context.Responses.FirstOrDefaultAsync(r => r.GuidId == guidId);
        return mapper.ResponseToResponseResponseDto(question);
    }
}