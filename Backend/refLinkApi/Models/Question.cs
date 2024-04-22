using System.ComponentModel.DataAnnotations;

namespace refLinkApi.Models;

public class Question { 

    [Key]
    public int Id { get; set; }

    public required string Content { get; set; }

    public int Posting_id { get; set; }

    public required Posting Posting { get; set; }
}   