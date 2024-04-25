using refLinkApi.Dtos;

namespace refLinkApi.Services;

public interface IResponseService
{
    public Task<ResponseResponseDto> PostNewResponse(ResponseRequestDto postingRequestDto);
    public Task<List<ResponseResponseDto>> GetResponses();
    public Task<ResponseResponseDto> GetResponseByGuid(Guid guidId);
}