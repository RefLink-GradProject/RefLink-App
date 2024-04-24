using Microsoft.EntityFrameworkCore;
using refLinkApi.Dtos;
using refLinkApi.Dtos.Mappers;
using refLinkApi.Models;

namespace refLinkApi.Services;

public class PostingService : IPostingService
{
    private readonly RefLinkContext _context;
    private readonly Mapper mapper;

    public PostingService(RefLinkContext context)
    {
        _context = context;
        mapper = new Mapper();
    }
    
    public async Task<PostingResponseDto> PostNewPosting(PostingRequestDto postingRequestDto)
    {
        if (_context.Postings == null)
        {
            return null;
        }
        
        var posting = mapper.PostingRequestDtoToPosting(postingRequestDto);
        _context.Postings.Add(posting);
        await _context.SaveChangesAsync();

        return mapper.PostingToPostingResponseDto(posting);
    }

    public async Task<List<PostingResponseDto>> GetPostings()
    {
        if (_context.Postings is null)
        {
            return null;
        }

        var postings = await _context.Postings.Include(p => p.Candidates).Include(p => p.Questions).ToListAsync();
        List<PostingResponseDto> postingResponseDtos = [];
        foreach (Posting posting in postings)
        {
            postingResponseDtos.Add(mapper.PostingToPostingResponseDto(posting));
        }
        return postingResponseDtos;
    }

    public async Task<PostingResponseDto> GetPostingById(Guid guidId)
    {
        if (_context.Postings is null)
        {
            return null;
        }

        var posting = await _context.Postings.FirstOrDefaultAsync(r => r.GuidId == guidId);
        return mapper.PostingToPostingResponseDto(posting);
    }
}