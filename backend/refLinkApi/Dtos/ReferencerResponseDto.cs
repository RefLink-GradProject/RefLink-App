namespace refLinkApi.Dtos;

public class ReferencerResponseDto
{
    public required string Name { get; set; }

    public required string Email { get; set; }
    public required Guid GuidId { get; set; }
    
}