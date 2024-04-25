using refLinkApi.Models;

namespace refLinkApi.Dtos;

public class QuestionResponsesResponseDto
{
    public string ResponseContent { get; set; }
    public Guid ResponseGuid { get; set; }
    public string Referencer { get; set; }
    public Guid ReferencerGuid { get; set; }
}