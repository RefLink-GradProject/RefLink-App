namespace refLinkApi.Dtos;

public class QuestionRequestDto
{
    public required string Content { get; set; }
    public required Guid PostingGuid { get; set; }
}