using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace refLinkApi.Models;

public class Posting
{
    [Key]
    public int Id { get; set; }

    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public required Guid GuidId { get; set; }

    public required string Title { get; set; }

    public required string Description { get; set; }

    public int EmployerId { get; set; }

    public ICollection<Candidate>? Candidates { get; set; }
    
    public ICollection<Question>? Questions { get; set; }
}
