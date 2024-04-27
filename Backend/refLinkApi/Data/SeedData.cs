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
            Email = "EmployerEmail",
            AuthId = "hello"
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
            RatingQuestions = new List<RatingQuestion>(),
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
        Question question2 = new Question()
        {
            Content = "Creativity",
            Posting = posting,
            PostingGuid = posting.GuidId,
            Responses = new List<Response>(),
        };
        Question question3 = new Question()
        {
            Content = "Adaptability",
            Posting = posting,
            PostingGuid = posting.GuidId,
            Responses = new List<Response>(),
        };
        Question question4 = new Question()
        {
            Content = "Coding Efficiency",
            Posting = posting,
            PostingGuid = posting.GuidId,
            Responses = new List<Response>(),
        };
        // Does this need to be persisted in Posting context?
        posting.Questions.Add(question);
        posting.Questions.Add(question2);
        posting.Questions.Add(question3);
        posting.Questions.Add(question4);
        
        _context.Questions.Add(question);
        _context.Questions.Add(question2);
        _context.Questions.Add(question3);
        _context.Questions.Add(question4);
        _context.SaveChanges();
        
        RatingQuestion ratingQuestion = new RatingQuestion()
        {
            Content = "This is a RATING question",
            Posting = posting,
            PostingGuid = posting.GuidId,
            Responses = new List<Response>(),
        };
        posting.RatingQuestions.Add(ratingQuestion);
        _context.RatingQuestions.Add(ratingQuestion);
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
        var response2 = new Response()
        {
            Content = "4",
            Question = question2,
            Referencer = referencer,
            QuestionId = question2.Id,
            ReferencerId = referencer.Id,
        };
        var response3 = new Response()
        {
            Content = "2",
            Question = question3,
            Referencer = referencer,
            QuestionId = question3.Id,
            ReferencerId = referencer.Id,
        };
        var response4 = new Response()
        {
            Content = "5",
            Question = question4,
            Referencer = referencer,
            QuestionId = question4.Id,
            ReferencerId = referencer.Id,
        };

        _context.Responses.Add(response);
        _context.Responses.Add(response2);
        _context.Responses.Add(response3);
        _context.Responses.Add(response4);
        _context.SaveChanges();
        

        }
    }

}
