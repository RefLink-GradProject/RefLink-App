namespace refLinkApi.Dtos;

public class RatingQuestionAndResponsePairDto
{
    public string RatingQuestionContent { get; set; }
    public Guid RatingQuestionGuidId { get; set; }
    public string ResponseContent { get; set; }
    public Guid ResponseGuidId { get; set; }
}