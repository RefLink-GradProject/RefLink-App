using System.ComponentModel.DataAnnotations;

namespace refLinkApi.Models;

    public class Candidate
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Email { get; set; }

        public int? PostingId { get; set; }
        public Posting Posting { get; set; }

        public ICollection<Referencer> Referencers { get; set; }
    }