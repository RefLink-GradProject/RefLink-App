using refLinkApi.Models;

namespace refLinkApi.Dtos;

public class QuestionRequestDto
{
    public required string Content { get; set; }
    public required QuestionType Type { get; set; }
    public required Guid PostingGuid { get; set; }
}