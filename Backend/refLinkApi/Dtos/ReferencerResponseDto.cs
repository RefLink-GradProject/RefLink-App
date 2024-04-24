namespace refLinkApi.Dtos;

public class ReferencerResponseDto
{
    public required Guid GuidId { get; set; }

    public required string Name { get; set; }

    public required string Email { get; set; }
    
    // TODO: consider returning a Dictionary with Question/Response
}