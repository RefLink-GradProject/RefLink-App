namespace refLinkApi.Dtos;

public class RatingQuestionRequestDto
{
    public required string Content { get; set; }
    public required Guid PostingGuid { get; set; }
}