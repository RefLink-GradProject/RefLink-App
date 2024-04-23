using System.ComponentModel.DataAnnotations;
using System.Security.Cryptography.Xml;
using System.Text.Json.Serialization;


namespace refLinkApi.Models;
public class Response
{
    [Key]
    public int Id { get; set; }

    public required Guid GuidId = Guid.NewGuid();

    public required string Content { get; set; }
    
    public int QuestionId { get; set; }
}