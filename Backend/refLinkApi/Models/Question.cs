using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace refLinkApi.Models;
public class Question
{
    [Key]
    public int Id { get; set; }
    
    public Guid GuidId { get; set; } = Guid.NewGuid();

    public required string Content { get; set; }
    
    public Guid PostingGuid { get; set; }
    public Posting Posting { get; set; }

    public ICollection<Response>? Responses { get; set; }
}