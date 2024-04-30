using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Cryptography.Xml;
using System.Text.Json.Serialization;


namespace refLinkApi.Models;
public class Response
{
    [Key]
    public int Id { get; set; }
    public Guid GuidId { get; set; } = Guid.NewGuid();

    public required string Content { get; set; }
    
    public Guid? QuestionGuid { get; set; }

    public Guid? ReferencerGuid { get; set; }
    
    public Referencer Referencer { get; set; }
    public Question? Question { get; set; }
}