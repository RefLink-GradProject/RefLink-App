using System.ComponentModel.DataAnnotations;

namespace refLinkApi.Models;
public class Question
{
    [Key]
    public int Id { get; set; }

    public required Guid GuidId = Guid.NewGuid();

    public required string Content { get; set; }

    public int PostingId { get; set; }

    public ICollection<Response>? Responses { get; set; }
}