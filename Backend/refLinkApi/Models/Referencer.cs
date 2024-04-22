using System.ComponentModel.DataAnnotations;

namespace refLinkApi.Models;

    public class Referencer
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Email { get; set; }

        public int CandidateId { get; set; }
        public Candidate Candidate { get; set; }

        // public int ResponseId { get; set; }
        public Response Response { get; set; }
    }