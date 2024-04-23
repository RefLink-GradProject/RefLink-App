using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace refLinkApi.Models;

public class Referencer
{
    [Key]
    public int Id { get; set; }

    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid GuidId { get; set; }
    
    public required string Name { get; set; }
    
    public required string Email { get; set; }

    public int CandidateId { get; set; }

    public List<Response>? Responses { get; set; }
}