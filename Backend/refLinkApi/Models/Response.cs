using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Cryptography.Xml;
using System.Text.Json.Serialization;


namespace refLinkApi.Models;
public class Response
{
    [Key]
    public int Id { get; set; }
    
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public required Guid GuidId { get; set; }

    public required string Content { get; set; }
    
    public int QuestionId { get; set; }
}