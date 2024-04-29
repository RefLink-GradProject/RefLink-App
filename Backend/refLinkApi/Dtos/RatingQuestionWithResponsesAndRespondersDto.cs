namespace refLinkApi.Dtos;

public class RatingQuestionWithResponsesAndRespondersDto
{
    public required Guid RatingQuestionGuidId { get; set; }

    public required string RatingQuestionContent { get; set; }

    public List<QuestionResponsesResponseDto> Responses { get; set; }
}