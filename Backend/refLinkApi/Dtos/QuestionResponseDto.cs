using refLinkApi.Models;

namespace refLinkApi.Dtos;

public class QuestionResponseDto
{
    public required Guid GuidId { get; set; }
    public required QuestionType Type { get; set; }
    public required string Content { get; set; }
}