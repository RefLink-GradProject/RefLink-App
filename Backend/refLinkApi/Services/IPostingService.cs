using refLinkApi.Dtos;

namespace refLinkApi.Services;

public interface IPostingService
{
    public Task<PostingResponseDto> PostNewPosting(PostingRequestDto postingRequestDto);
    public Task<List<PostingResponseDto>> GetPostings();
    public Task<PostingResponseDto> GetPostingByGuid(Guid guidId);
}