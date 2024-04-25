namespace refLinkApi.Dtos;

public class CandidateDetailedResponseDto
{
    public Guid GuidId { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public List<RespondersWithQuestionsAndAnswersDto> Referencers { get; set; }

}