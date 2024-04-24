namespace refLinkApi.Dtos;

public class CandidateRequestDto
{
    public required string Name { get; set; }
    public required string Email { get; set; }
    public required Guid PostingGuid { get; set; }
}