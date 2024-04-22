using System.ComponentModel.DataAnnotations;

namespace refLinkApi.Models;
    public class Question
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Content { get; set; }

        public int PostingId { get; set; }
        public Posting Posting { get; set; }

        public ICollection<Response> Responses { get; set; }
    }