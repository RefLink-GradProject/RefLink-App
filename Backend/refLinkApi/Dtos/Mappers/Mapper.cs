using refLinkApi.Models;
using Riok.Mapperly.Abstractions;

namespace refLinkApi.Dtos.Mappers;

[Mapper]
public partial class Mapper
{
    [MapperIgnoreTarget(nameof(Candidate.GuidId))]
    public partial Candidate CandidateRequestDtoToCandidate(CandidateRequestDto request);
    public partial CandidateResponseDto CandidateToCandidateResponseDto(Candidate candidate);

    [MapperIgnoreTarget(nameof(Posting.GuidId))]
    public partial Posting PostingRequestDtoToPosting(PostingRequestDto request);
    public partial PostingResponseDto PostingToPostingResponseDto(Posting posting);
    
    [MapperIgnoreTarget(nameof(Question.GuidId))]
    public partial Question QuestionRequestDtoToQuestion(QuestionRequestDto request);
    public partial QuestionResponseDto QuestionToQuestionResponseDto(Question posting);

    [MapperIgnoreTarget(nameof(Referencer.GuidId))]
    public partial Referencer ReferencerRequestDtoToReferencer(ReferencerRequestDto request);
    public partial ReferencerResponseDto ReferencerToReferencerResponseDto(Referencer reference);
    
    [MapperIgnoreTarget(nameof(Response.GuidId))]
    public partial Response ResponseRequestDtoToResponse(ResponseRequestDto request);
    public partial ResponseResponseDto ResponseToResponseResponseDto(Response response);
}