namespace refLinkApi.Dtos;

public class CandidateResponseDto
{
    public required Guid GuidId { get; set; }

    public required string Name { get; set; }

    public required string Email { get; set; }
}