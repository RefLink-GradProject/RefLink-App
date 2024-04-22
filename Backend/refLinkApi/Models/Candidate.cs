using System.ComponentModel.DataAnnotations;

namespace refLinkApi.Models;

public class Candidate { 

    [Key]
    public int Id { get; set; }

    public required string Name { get; set; }

    public required string Email { get; set; }

    // public required string Phone { get; set; }

    public int Posting_id { get; set; }

    public required Posting Posting { get; set; }
}