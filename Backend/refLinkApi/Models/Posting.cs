using System.ComponentModel.DataAnnotations;

namespace refLinkApi.Models;

public class Posting { 

    [Key]
    public int Id { get; set; }

    public required string Title { get; set; }

    public required string Description { get; set; }

    public List<string>? Skills { get; set; }

    public int Employer_id { get; set; }
    
    public required Employer Employer { get; set; }

}