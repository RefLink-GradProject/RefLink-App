namespace refLinkApi.Dtos;

public class PostingResponseDto
{
    public Guid GuidId { get; set; }
    public required string Title { get; set; }
    public required string Description { get; set; }
}