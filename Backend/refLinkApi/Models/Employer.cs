using System.ComponentModel.DataAnnotations;

namespace refLinkApi.Models;

    public class Employer
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Company { get; set; }

        [Required]
        public string Email { get; set; }

        public ICollection<Posting> Postings { get; set; }
    }