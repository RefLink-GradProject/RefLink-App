using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace refLinkApi.Models;

public class Posting
{
    [Key]
    public int Id { get; set; }
    public Guid GuidId { get; set; } = Guid.NewGuid();

    public required string Title { get; set; }

    public required string Description { get; set; }

    public Guid EmployerGuid { get; set; }
    
    public Employer? Employer { get; set; }

    public ICollection<Candidate>? Candidates { get; set; }
    
    public ICollection<Question>? Questions { get; set; }
}
