using Microsoft.EntityFrameworkCore;
using refLinkApi.Models;

public static class SeedData
{
    public static async void Initialize(IServiceProvider serviceProvider)
    {
        using (var _context = new RefLinkContext(
                   serviceProvider.GetRequiredService<DbContextOptions<RefLinkContext>>()))
        {
            _context.Database.EnsureDeleted();
            _context.Database.EnsureCreated();

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
            EmployerGuid = employer.GuidId
        };
        _context.Postings.Add(posting);
        _context.SaveChanges();
        
        Candidate candidate = new Candidate
        {
            Name = "CandidateName",
            Email = "CandidateEmail",
            PostingGuid = posting.GuidId
        };
        _context.Candidates.Add(candidate);
        _context.SaveChanges();
        }
    }

}
