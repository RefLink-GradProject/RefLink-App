using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace refLinkApi.Models;
public class Question
{
    [Key]
    public int Id { get; set; }

    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public required Guid GuidId { get; set; }

    public required string Content { get; set; }

    public int PostingId { get; set; }

    public ICollection<Response>? Responses { get; set; }
}