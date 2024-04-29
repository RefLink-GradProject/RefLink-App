using refLinkApi.Models;

namespace refLinkApi.Dtos;

public class RatingQuestionResponsesResponseDto
{
    public string ResponseContent { get; set; }
    public Guid ResponseGuid { get; set; }
    public string Referencer { get; set; }
    public Guid ReferencerGuid { get; set; }
}