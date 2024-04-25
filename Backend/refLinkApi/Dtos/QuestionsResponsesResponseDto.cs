using refLinkApi.Models;

namespace refLinkApi.Dtos;

public class QuestionResponsesResponseDto
{
    public string ResponseContent { get; set; }
    public Guid ResponseGuid { get; set; }
    public string Responder { get; set; }
    public Guid ResponderGuid { get; set; }
}