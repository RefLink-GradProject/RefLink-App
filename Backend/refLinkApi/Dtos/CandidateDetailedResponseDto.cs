namespace refLinkApi.Dtos;

public class CandidateDetailedResponseDto
{
    public required Guid GuidId { get; set; }

    public required string Name { get; set; }

    public required string Email { get; set; }

    public List<QuestionWithResponsesAndRespondersDto> Questions { get; set; }
}