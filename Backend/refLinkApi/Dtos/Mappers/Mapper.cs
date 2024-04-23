using refLinkApi.Models;
using Riok.Mapperly.Abstractions;

namespace refLinkApi.Dtos.Mappers;

[Mapper]
public partial class Mapper
{
    public partial CandidateRequestDto CandidateToCandidateRequestDto(Candidate candidate);
    public partial CandidateResponseDto CandidateToCandidateResponseDto(Candidate candidate);
}