using refLinkApi.Models;

namespace refLinkApi.Dtos;

public class QuestionResponseDto
{
    public required Guid GuidId { get; set; }
    public required string Content { get; set; }
    public QuestionType Type { get; set; }
}