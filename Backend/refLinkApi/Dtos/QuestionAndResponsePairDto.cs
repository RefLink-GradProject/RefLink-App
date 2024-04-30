namespace refLinkApi.Dtos;

public class QuestionAndResponsePairDto
{
    public string QuestionContent { get; set; }
    public Guid QuestionGuidId { get; set; }
    public string ResponseContent { get; set; }
    public Guid ResponseGuidId { get; set; }
}