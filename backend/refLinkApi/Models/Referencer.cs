using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace refLinkApi.Models;

public class Referencer
{
    [Key]
    public int Id { get; set; }
    
    public Guid GuidId { get; set; } = Guid.NewGuid();
    
    public required string Name { get; set; }
    
    public required string Email { get; set; }

    public Guid CandidateGuid { get; set; }

    public List<Response>? Responses { get; set; }
    public Candidate Candidate { get; set; }
}