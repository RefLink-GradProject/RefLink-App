using refLinkApi.Models;
using Riok.Mapperly.Abstractions;

namespace refLinkApi.Dtos.Mappers;

[Mapper]
public partial class Mapper
{
    [MapperIgnoreTarget(nameof(Candidate.GuidId))]
    public partial Candidate CandidateRequestDtoToCandidate(CandidateRequestDto request);
    public partial CandidateResponseDto CandidateToCandidateResponseDto(Candidate candidate);
}