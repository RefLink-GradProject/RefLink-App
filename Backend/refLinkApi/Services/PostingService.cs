using refLinkApi.Dtos;

namespace refLinkApi.Services;

public class PostingService : IPostingService
{
    public Task<PostingResponseDto> PostNewPosting(PostingRequestDto postingRequestDto)
    {
        throw new NotImplementedException();
    }

    public Task<List<PostingResponseDto>> GetPostings()
    {
        throw new NotImplementedException();
    }

    public Task<PostingResponseDto> GetPostingById(Guid guidId)
    {
        throw new NotImplementedException();
    }
}