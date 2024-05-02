namespace refLinkApi.Dtos;

public class ResponseRequestDto
{
    public required string Content { get; set; }
    public required Guid QuestionGuid { get; set; }
    public required Guid ReferencerGuid { get; set; }
}