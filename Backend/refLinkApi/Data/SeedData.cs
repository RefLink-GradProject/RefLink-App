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
                Title = "C# Software Developer",
                Description = "We're seeking a skilled C# Software Developer to join us, responsible for designing, developing, and maintaining our C# codebase. You'll collaborate with teams, troubleshoot issues, and contribute to our fast-paced, innovative environment.",
                Employer = employer,
                EmployerGuid = employer.GuidId,
                Questions = new List<Question>(),
            };

            _context.Postings.Add(posting);
            _context.SaveChanges();

            Question questionT1 = new Question()
            {
                Content = "How long have you known the candidate and in what capacity?",
                Posting = posting,
                Type = QuestionType.Text,
                PostingGuid = posting.GuidId,
                Responses = new List<Response>(),
            };
            Question questionT2 = new Question()
            {
                Content = "Has the candidate shown strong teamwork in C# projects?",
                Posting = posting,
                Type = QuestionType.Text,
                PostingGuid = posting.GuidId,
                Responses = new List<Response>(),
            };
            Question question2 = new Question()
            {
                Content = "Collaboration",
                Posting = posting,
                Type = QuestionType.Rating,
                PostingGuid = posting.GuidId,
                Responses = new List<Response>(),
            };
            Question question3 = new Question()
            {
                Content = "Adaptability",
                Posting = posting,
                Type = QuestionType.Rating,
                PostingGuid = posting.GuidId,
                Responses = new List<Response>(),
            };
            Question question4 = new Question()
            {
                Content = "Creativity",
                Posting = posting,
                Type = QuestionType.Rating,
                PostingGuid = posting.GuidId,
                Responses = new List<Response>(),
            };
            Question question5 = new Question()
            {
                Content = "Time Management",
                Posting = posting,
                Type = QuestionType.Rating,
                PostingGuid = posting.GuidId,
                Responses = new List<Response>(),
            };
            Question question6 = new Question()
            {
                Content = "Friendliness",
                Posting = posting,
                Type = QuestionType.Rating,
                PostingGuid = posting.GuidId,
                Responses = new List<Response>(),
            };
            
            // Does this need to be persisted in Posting context?
            posting.Questions.Add(questionT1);
            posting.Questions.Add(questionT2);
            posting.Questions.Add(question2);
            posting.Questions.Add(question3);
            posting.Questions.Add(question4);
            posting.Questions.Add(question5);
            posting.Questions.Add(question6);

            _context.Questions.Add(questionT1);
            _context.Questions.Add(questionT2);
            _context.Questions.Add(question2);
            _context.Questions.Add(question3);
            _context.Questions.Add(question4);
            _context.Questions.Add(question5);
            _context.Questions.Add(question6);
            _context.SaveChanges();

            Candidate candidate = new Candidate
            {
                Name = "Emily Brown",
                Email = "emily.brown@gmail.com",
                PostingGuid = posting.GuidId
            };


            _context.Candidates.Add(candidate);
            _context.SaveChanges();

            var referencer1 = new Referencer
            {
                Name = " Olivia Taylor",
                Email = "olivia.taylor@mail.com",
                Responses = new List<Response>(),
                CandidateGuid = candidate.GuidId,
            };
            var referencer2 = new Referencer
            {
                Name = " Jessica Smith",
                Email = " jsmith@mail.com",
                Responses = new List<Response>(),
                CandidateGuid = candidate.GuidId,
            };

            _context.Referencers.Add(referencer1);
            _context.Referencers.Add(referencer2);
            _context.SaveChanges();

            var response = new Response()
            {
                Content = "The candidate actively engages with the team, contributes ideas, and communicates effectively for project success.",
                Question = questionT2,
                Referencer = referencer1,
                QuestionGuid = questionT2.GuidId,
                ReferencerGuid = referencer1.GuidId,
            };
            var response2 = new Response()
            {
                Content = "3",
                Question = question2,
                Referencer = referencer1,
                QuestionGuid = question2.GuidId,
                ReferencerGuid = referencer1.GuidId,
            };
            var response3 = new Response()
            {
                Content = "4",
                Question = question3,
                Referencer = referencer1,
                QuestionGuid = question3.GuidId,
                ReferencerGuid = referencer1.GuidId,
            };
            var response4 = new Response()
            {
                Content = "5",
                Question = question4,
                Referencer = referencer1,
                QuestionGuid = question4.GuidId,
                ReferencerGuid = referencer1.GuidId,
            };
            var response5 = new Response()
            {
                Content = "5",
                Question = question5,
                Referencer = referencer1,
                QuestionGuid = question5.GuidId,
                ReferencerGuid = referencer1.GuidId,
            };
            var response6 = new Response()
            {
                Content = "1",
                Question = question6,
                Referencer = referencer1,
                QuestionGuid = question6.GuidId,
                ReferencerGuid = referencer1.GuidId,
            };
            // new responses
            var response7 = new Response()
            {
                Content = "In my experience, the candidate has struggled with collaboration in team settings. ",
                Question = questionT1,
                Referencer = referencer2,
                QuestionGuid = questionT1.GuidId,
                ReferencerGuid = referencer2.GuidId,
            };
            var response8 = new Response()
            {
                Content = "1",
                Question = question2,
                Referencer = referencer2,
                QuestionGuid = question2.GuidId,
                ReferencerGuid = referencer2.GuidId,
            };
            var response9 = new Response()
            {
                Content = "4",
                Question = question3,
                Referencer = referencer2,
                QuestionGuid = question3.GuidId,
                ReferencerGuid = referencer2.GuidId,
            };
            var response10 = new Response()
            {
                Content = "5",
                Question = question4,
                Referencer = referencer2,
                QuestionGuid = question4.GuidId,
                ReferencerGuid = referencer2.GuidId,
            };
            var response11 = new Response()
            {
                Content = "5",
                Question = question5,
                Referencer = referencer2,
                QuestionGuid = question5.GuidId,
                ReferencerGuid = referencer2.GuidId,
            };
            var response12 = new Response()
            {
                Content = "1",
                Question = question6,
                Referencer = referencer2,
                QuestionGuid = question6.GuidId,
                ReferencerGuid = referencer2.GuidId,
            };

            _context.Responses.Add(response);
            _context.Responses.Add(response2);
            _context.Responses.Add(response3);
            _context.Responses.Add(response4);
            _context.Responses.Add(response5);
            _context.Responses.Add(response6);
            _context.Responses.Add(response7);
            _context.Responses.Add(response8);
            _context.Responses.Add(response9);
            _context.Responses.Add(response10);
            _context.Responses.Add(response11);
            _context.Responses.Add(response12);
            _context.SaveChanges();


        }
    }

}
