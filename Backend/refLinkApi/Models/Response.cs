using System.ComponentModel.DataAnnotations;
using System.Security.Cryptography.Xml;
using System.Text.Json.Serialization;


namespace refLinkApi.Models;

public class Response { 

    [Key]
    public int Id { get; set; }

    public required string Content { get; set; }

    public int Referencer_id { get; set; }
    [JsonIgnore]
    public required Referencer Referencer { get; set; }

    public int Question_id { get; set; }  
    
    public required Question Question { get; set; }
}