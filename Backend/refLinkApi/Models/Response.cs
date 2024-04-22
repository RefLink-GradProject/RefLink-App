using System.ComponentModel.DataAnnotations;
using System.Security.Cryptography.Xml;
using System.Text.Json.Serialization;


namespace refLinkApi.Models;
    public class Response
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Content { get; set; }

        public int QuestionId { get; set; }
        public Question Question { get; set; }

        public int ReferencerId { get; set; }
        public Referencer Referencer { get; set; }
    }