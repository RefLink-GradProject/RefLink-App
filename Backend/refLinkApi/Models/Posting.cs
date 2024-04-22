using System.ComponentModel.DataAnnotations;

namespace refLinkApi.Models;

    public class Posting
    {
        [Key]
        public int Id { get; set; }

        public required string Title { get; set; }

        public required string Description { get; set; }

        public ICollection<Candidate> Candidates { get; set; }
        public ICollection<Question> Questions { get; set; }
    }
