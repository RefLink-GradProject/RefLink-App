namespace refLinkApi.Dtos;

public class QuestionWithResponsesAndRespondersDto
{
    public required Guid QuestionGuidId { get; set; }

    public required string QuestionContent { get; set; }

    public List<QuestionResponsesResponseDto> Responses { get; set; }
}