using System.ComponentModel.DataAnnotations;

namespace refLinkApi.Models;
    public class Question
    {
        [Key]
        public int Id { get; set; }

        public required string Content { get; set; }
        public int PostingId { get; set; }

        public ICollection<Response> Responses { get; set; }
    }