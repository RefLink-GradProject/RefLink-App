namespace refLinkApi.Dtos;

public class RespondersWithQuestionsAndAnswersDto
{
    public string Name { get; set; }
    public Guid GuidId { get; set; }
    public List<QuestionAndResponsePairDto> Responses { get; set; }
}