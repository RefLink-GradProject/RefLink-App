using System.ComponentModel.DataAnnotations;

namespace refLinkApi.Models;
public class Question
{
    [Key]
    public int Id { get; set; }
    
    public Guid GuidId { get; set; } = Guid.NewGuid();
    public QuestionType Type { get; set; }

    public required string Content { get; set; }
    
    public Guid PostingGuid { get; set; }
    public Posting Posting { get; set; }

    public ICollection<Response>? Responses { get; set; }
}

public enum QuestionType
{
    Text,
    Rating,
}