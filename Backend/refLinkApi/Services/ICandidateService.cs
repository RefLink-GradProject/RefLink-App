using refLinkApi.Dtos;
namespace refLinkApi.Services;

public interface ICandidateService
{
    public Task<CandidateResponseDto> PostNewCandidate(CandidateRequestDto candidateRequestDto);
    public Task<List<CandidateResponseDto>> GetCandidates();
    public Task<CandidateResponseDto> GetCandidateById(Guid guidId);
}