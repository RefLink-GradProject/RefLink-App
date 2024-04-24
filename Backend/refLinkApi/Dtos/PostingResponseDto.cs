namespace refLinkApi.Dtos;

public class PostingResponseDto
{
    public Guid GuidId { get; set; }
    public required string Title { get; set; }
    public required string Description { get; set; }
    
    public ICollection<CandidateResponseDto>? Candidates { get; set; }
    
    public ICollection<QuestionResponseDto>? Questions { get; set; }
}