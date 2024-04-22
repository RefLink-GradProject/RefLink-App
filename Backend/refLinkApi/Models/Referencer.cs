using System.ComponentModel.DataAnnotations;

namespace refLinkApi.Models;

public class Referencer { 

    [Key]
    public int Id { get; set; }

    public required string Name { get; set; }

    // public required string Phone { get; set; }

    public required string Email { get; set; }

    public int Candidate_id { get; set; }  

    public required Candidate Candidate { get; set; } 
}