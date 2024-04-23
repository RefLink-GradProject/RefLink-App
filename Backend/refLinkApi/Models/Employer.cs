using System.ComponentModel.DataAnnotations;

namespace refLinkApi.Models;

public class Employer
{
    [Key]
    public int Id { get; set; }

    public required Guid GuidId = Guid.NewGuid();

    public required string Name { get; set; }

    public required string Company { get; set; }

    public required string Email { get; set; }

    public ICollection<Posting>? Postings { get; set; }
}