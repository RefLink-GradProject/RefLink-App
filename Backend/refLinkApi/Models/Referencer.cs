using System.ComponentModel.DataAnnotations;

namespace refLinkApi.Models;

    public class Referencer
    {
        [Key]
        public int Id { get; set; }

        public required string Name { get; set; }

        public required string Email { get; set; }
        public int CandidateId { get; set; }
        public List<Response> Responses { get; set; }
    }