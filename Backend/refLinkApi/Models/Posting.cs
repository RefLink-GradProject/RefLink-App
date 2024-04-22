using System.ComponentModel.DataAnnotations;

namespace refLinkApi.Models;

    public class Posting
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }


        public int EmployerId { get; set; }
        public Employer Employer { get; set; }

        public ICollection<Candidate> Candidates { get; set; }
        public ICollection<Question> Questions { get; set; }
    }
