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
            Employer = employer,
            EmployerGuid = employer.GuidId,
            Questions = new List<Question>(),
        };
        
        _context.Postings.Add(posting);
        _context.SaveChanges();

        Question question = new Question()
        {
            Content = "This is a question",
            Posting = posting,
            PostingGuid = posting.GuidId,
            Responses = new List<Response>(),
        };
        
        // Does this need to be persisted in Posting context?
        posting.Questions.Add(question);
        
        _context.Questions.Add(question);
        _context.SaveChanges();
        
        Candidate candidate = new Candidate
        {
            Name = "CandidateName",
            Email = "CandidateEmail",
            PostingGuid = posting.GuidId
        };
        
        
        _context.Candidates.Add(candidate);
        _context.SaveChanges();

        var referencer = new Referencer
        {
            Name = "Mr. Referencer",
            Email = "referencer@gmail.com",
            Responses = new List<Response>(),
            CandidateGuid = candidate.GuidId,
        };
        
        _context.Referencers.Add(referencer);
        _context.SaveChanges();

        var response = new Response()
        {
            Content = "This is a response",
            Question = question,
            Referencer = referencer,
            QuestionId = question.Id,
            ReferencerId = referencer.Id,
        };

        _context.Responses.Add(response);
        _context.SaveChanges();
        

        }
    }

}
