namespace refLinkApi.Dtos;

public class EmployerResponseDto
{
    public required Guid GuidId { get; set; }

    public required string Name { get; set; }

    public required string Company { get; set; }

    public required string Email { get; set; }
}