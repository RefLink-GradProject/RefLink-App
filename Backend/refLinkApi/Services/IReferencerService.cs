using refLinkApi.Dtos;

namespace refLinkApi.Services;

public interface IReferencerService
{
    public Task<ReferencerResponseDto> PostNewReferencer(ReferencerRequestDto referencerRequestDto);
    public Task<List<ReferencerResponseDto>> GetReferencers();
    public Task<ReferencerResponseDto> GetReferencerByGuid(Guid guidId);
}