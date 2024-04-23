using Microsoft.EntityFrameworkCore;
using refLinkApi.Models;

public static class SeedData
{
    public static async void Initialize(IServiceProvider serviceProvider)
    {
        using (var _context = new RefLinkContext(
                   serviceProvider.GetRequiredService<DbContextOptions<RefLinkContext>>()))
        {
            _context.Database.EnsureDeleted(); // Clear the database
            //_context.Database.Migrate();
            _context.Database.EnsureCreated(); // Create the database if not exists

            Employer employer = new Employer
            {
                GuidId = Guid.NewGuid(),
                Name = "EmployerName",
                Company = "EmpoyerCompany",
                Email = "EmployerEmail"
            };
            _context.Employers.Add(employer);
            _context.SaveChanges();

            Posting posting = new Posting
            {
                GuidId = Guid.NewGuid(),
                Title = "PostingTitle",
                Description = "PostingDescription",
                EmployerId = 1
            };
            _context.Postings.Add(posting);
            _context.SaveChanges();

            Candidate candidate = new Candidate
            {
                GuidId = Guid.NewGuid(),
                Name = "CandidateName",
                Email = "CandidateEmail",
                PostingId = 1
            };
            _context.Candidates.Add(candidate);
            _context.SaveChanges();
        }
    }

}
