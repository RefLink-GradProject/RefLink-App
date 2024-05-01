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

            // posting1-----------------
            Posting posting1 = new Posting
            {
                GuidId = Guid.NewGuid(),
                Title = "C# Software Developer",
                Description = "We're seeking a skilled C# Software Developer to join us, responsible for designing, developing, and maintaining our C# codebase. You'll collaborate with teams, troubleshoot issues, and contribute to our fast-paced, innovative environment.",
                Employer = employer,
                EmployerGuid = employer.GuidId,
                Questions = new List<Question>(),
            };

            _context.Postings.Add(posting1);
            _context.SaveChanges();

            Question questionT1 = new Question()
            {
                Content = "How long have you known the candidate and in what capacity?",
                Posting = posting1,
                Type = QuestionType.Text,
                PostingGuid = posting1.GuidId,
                Responses = new List<Response>(),
            };
            Question questionT2 = new Question()
            {
                Content = "Has the candidate shown strong teamwork in C# projects?",
                Posting = posting1,
                Type = QuestionType.Text,
                PostingGuid = posting1.GuidId,
                Responses = new List<Response>(),
            };
            Question question2 = new Question()
            {
                Content = "Collaboration",
                Posting = posting1,
                Type = QuestionType.Rating,
                PostingGuid = posting1.GuidId,
                Responses = new List<Response>(),
            };
            Question question3 = new Question()
            {
                Content = "Adaptability",
                Posting = posting1,
                Type = QuestionType.Rating,
                PostingGuid = posting1.GuidId,
                Responses = new List<Response>(),
            };
            Question question4 = new Question()
            {
                Content = "Creativity",
                Posting = posting1,
                Type = QuestionType.Rating,
                PostingGuid = posting1.GuidId,
                Responses = new List<Response>(),
            };
            Question question5 = new Question()
            {
                Content = "Time Management",
                Posting = posting1,
                Type = QuestionType.Rating,
                PostingGuid = posting1.GuidId,
                Responses = new List<Response>(),
            };
            Question question6 = new Question()
            {
                Content = "Friendliness",
                Posting = posting1,
                Type = QuestionType.Rating,
                PostingGuid = posting1.GuidId,
                Responses = new List<Response>(),
            };
            
            // Does this need to be persisted in Posting context?
            posting1.Questions.Add(questionT1);
            posting1.Questions.Add(questionT2);
            posting1.Questions.Add(question2);
            posting1.Questions.Add(question3);
            posting1.Questions.Add(question4);
            posting1.Questions.Add(question5);
            posting1.Questions.Add(question6);

            _context.Questions.Add(questionT1);
            _context.Questions.Add(questionT2);
            _context.Questions.Add(question2);
            _context.Questions.Add(question3);
            _context.Questions.Add(question4);
            _context.Questions.Add(question5);
            _context.Questions.Add(question6);
            _context.SaveChanges();

            Candidate candidate1 = new Candidate
            {
                Name = "Emily Brown",
                Email = "emily.brown@gmail.com",
                PostingGuid = posting1.GuidId
            };
            Candidate candidate2 = new Candidate
            {
                Name = "David Johnson",
                Email = "david.johnson@gmail.com",
                PostingGuid = posting1.GuidId
            };

            _context.Candidates.Add(candidate1);
            _context.Candidates.Add(candidate2);
            _context.SaveChanges();

            // posting2---------------------
            Posting posting2 = new Posting
            {
                GuidId = Guid.NewGuid(),
                Title = "Senior Java Developer",
                Description = "We're looking for an experienced Senior Java Developer to join our team. You will lead the design and implementation of Java-based applications, mentor junior developers, and contribute to architectural decisions.",
                Employer = employer,
                EmployerGuid = employer.GuidId,
                Questions = new List<Question>(),
            };

            // Adding posting2 to the context
            _context.Postings.Add(posting2);
            _context.SaveChanges();

            // Creating text questions
            Question questionT3 = new Question()
            {
                Content = "How long have you known the candidate and in what capacity?",
                Posting = posting2,
                Type = QuestionType.Text,
                PostingGuid = posting2.GuidId,
                Responses = new List<Response>(),
            };
            Question questionT4 = new Question()
            {
                Content = "Describe the candidate's experience with Java development projects.",
                Posting = posting2,
                Type = QuestionType.Text,
                PostingGuid = posting2.GuidId,
                Responses = new List<Response>(),
            };

            // Adding text questions to posting2
            posting2.Questions.Add(questionT1);
            posting2.Questions.Add(questionT2);

            // Creating short questions
            Question question7 = new Question()
            {
                Content = "Teamwork",
                Posting = posting2,
                Type = QuestionType.Rating,
                PostingGuid = posting2.GuidId,
                Responses = new List<Response>(),
            };
            Question question8 = new Question()
            {
                Content = "Problem-solving",
                Posting = posting2,
                Type = QuestionType.Rating,
                PostingGuid = posting2.GuidId,
                Responses = new List<Response>(),
            };
            Question question9 = new Question()
            {
                Content = "Time Management",
                Posting = posting2,
                Type = QuestionType.Rating,
                PostingGuid = posting2.GuidId,
                Responses = new List<Response>(),
            };
            Question question10 = new Question()
            {
                Content = "Creativity",
                Posting = posting2,
                Type = QuestionType.Rating,
                PostingGuid = posting2.GuidId,
                Responses = new List<Response>(),
            };

            // Adding short questions to posting2
            posting2.Questions.Add(questionT3);
            posting2.Questions.Add(questionT4);
            posting2.Questions.Add(question7);
            posting2.Questions.Add(question8);
            posting2.Questions.Add(question9);
            posting2.Questions.Add(question10);

            // Adding questions to the context
            _context.Questions.Add(questionT3);
            _context.Questions.Add(questionT4);
            _context.Questions.Add(question7);
            _context.Questions.Add(question8);
            _context.Questions.Add(question9);
            _context.Questions.Add(question10);
            _context.SaveChanges();

            // Creating candidates for posting2
            Candidate candidate3 = new Candidate
            {
                Name = "Sarah Adams",
                Email = "sarah.adams@example.com",
                PostingGuid = posting2.GuidId
            };
            Candidate candidate4 = new Candidate
            {
                Name = "Daniel Smith",
                Email = "daniel.smith@example.com",
                PostingGuid = posting2.GuidId
            };

            // Adding candidates to the context
            _context.Candidates.Add(candidate3);
            _context.Candidates.Add(candidate4);
            _context.SaveChanges();


            var referencer1 = new Referencer
            {
                Name = " Olivia Taylor",
                Email = "olivia.taylor@mail.com",
                Responses = new List<Response>(),
                CandidateGuid = candidate1.GuidId,
            };
            var referencer2 = new Referencer
            {
                Name = " Jessica Smith",
                Email = " jsmith@mail.com",
                Responses = new List<Response>(),
                CandidateGuid = candidate1.GuidId,
            };
            var referencer3 = new Referencer
            {
                Name = "Michael Lee",
                Email = "michael.lee@example.com",
                Responses = new List<Response>(),
                CandidateGuid = candidate2.GuidId,
            };
            var referencer4 = new Referencer
            {
                Name = "Samantha Wilson",
                Email = "samantha.wilson@example.com",
                Responses = new List<Response>(),
                CandidateGuid = candidate2.GuidId,
            };
            var referencer5 = new Referencer
            {
                Name = "Benjamin Martinez",
                Email = "benjamin.martinez@example.com",
                Responses = new List<Response>(),
                CandidateGuid = candidate2.GuidId,
            };

            _context.Referencers.Add(referencer1);
            _context.Referencers.Add(referencer2);
            _context.Referencers.Add(referencer3);
            _context.Referencers.Add(referencer4);
            _context.Referencers.Add(referencer5);
            _context.SaveChanges();

            var responseT1 = new Response()
            {
                Content = "I've known the candidate for 3 years in a professional capacity as colleagues in the software development team.",
                Question = questionT1,
                Referencer = referencer1,
                QuestionGuid = questionT2.GuidId,
                ReferencerGuid = referencer1.GuidId,
            };
            var responseT2 = new Response()
            {
                Content = "The candidate demonstrates satisfactory teamwork skills, but there is room for improvement in communication and collaboration.",
                Question = questionT2,
                Referencer = referencer1,
                QuestionGuid = questionT2.GuidId,
                ReferencerGuid = referencer1.GuidId,
            };
            
            // responses for text quesitons
            var responseT3 = new Response()
            {
                Content = "In my experience, the candidate has struggled with collaboration in team settings. ",
                Question = questionT2,
                Referencer = referencer2,
                QuestionGuid = questionT2.GuidId,
                ReferencerGuid = referencer2.GuidId,
            };
            var responseT4 = new Response()
            {
                Content = "I've known the candidate for 4 years through our previous employment at XYZ Company.",
                Question = questionT1,
                Referencer = referencer2,
                QuestionGuid = questionT1.GuidId,
            };
            var responseT5 = new Response()
            {
                Content = "I've known the candidate for 2 years during our collaboration on various software projects.",
                Question = questionT1,
                Referencer = referencer3,
                QuestionGuid = questionT1.GuidId,
                ReferencerGuid = referencer3.GuidId,
            };
            var responseT6 = new Response()
            {
                Content = "The candidate actively engages with the team, contributes ideas, and communicates effectively for project success.",
                Question = questionT2,
                Referencer = referencer3,
                QuestionGuid = questionT2.GuidId,
                ReferencerGuid = referencer3.GuidId,
            };

            // responses for rating quesitons
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
            var response13 = new Response()
            {
                Content = "5",
                Question = question2,
                Referencer = referencer3,
                QuestionGuid = question2.GuidId,
                ReferencerGuid = referencer3.GuidId,
            };
            var response14 = new Response()
            {
                Content = "3",
                Question = question3,
                Referencer = referencer3,
                QuestionGuid = question3.GuidId,
                ReferencerGuid = referencer3.GuidId,
            };
            var response15 = new Response()
            {
                Content = "2",
                Question = question4,
                Referencer = referencer3,
                QuestionGuid = question4.GuidId,
                ReferencerGuid = referencer3.GuidId,
            };
            var response16 = new Response()
            {
                Content = "3",
                Question = question5,
                Referencer = referencer3,
                QuestionGuid = question5.GuidId,
                ReferencerGuid = referencer3.GuidId,
            };
            var response17 = new Response()
            {
                Content = "5",
                Question = question6,
                Referencer = referencer3,
                QuestionGuid = question6.GuidId,
                ReferencerGuid = referencer3.GuidId,
            };

            // Responses for referencer4
            var responseT7 = new Response()
            {
                Content = "I've known the candidate for 5 years since we worked together on several software development projects.",
                Question = questionT1,
                Referencer = referencer4,
                QuestionGuid = questionT1.GuidId,
                ReferencerGuid = referencer4.GuidId,
            };
            var responseT8 = new Response()
            {
                Content = "The candidate excels in teamwork and consistently contributes innovative ideas to project discussions.",
                Question = questionT2,
                Referencer = referencer4,
                QuestionGuid = questionT2.GuidId,
                ReferencerGuid = referencer4.GuidId,
            };
            var response18 = new Response()
            {
                Content = "5",
                Question = question2,
                Referencer = referencer4,
                QuestionGuid = question2.GuidId,
                ReferencerGuid = referencer4.GuidId,
            };
            var response19 = new Response()
            {
                Content = "4",
                Question = question3,
                Referencer = referencer4,
                QuestionGuid = question3.GuidId,
                ReferencerGuid = referencer4.GuidId,
            };
            var response20 = new Response()
            {
                Content = "5",
                Question = question4,
                Referencer = referencer4,
                QuestionGuid = question4.GuidId,
                ReferencerGuid = referencer4.GuidId,
            };
            var response21 = new Response()
            {
                Content = "5",
                Question = question5,
                Referencer = referencer4,
                QuestionGuid = question5.GuidId,
                ReferencerGuid = referencer4.GuidId,
            };
            var response22 = new Response()
            {
                Content = "5",
                Question = question6,
                Referencer = referencer4,
                QuestionGuid = question6.GuidId,
                ReferencerGuid = referencer4.GuidId,
            };

            var responseT9 = new Response()
            {
                Content = "I've known the candidate for 4 years, having collaborated closely on multiple software projects.",
                Question = questionT1,
                Referencer = referencer5,
                QuestionGuid = questionT1.GuidId,
                ReferencerGuid = referencer5.GuidId,
            };
            var responseT10 = new Response()
            {
                Content = "The candidate consistently demonstrates exceptional teamwork and communication skills, fostering a collaborative environment within the team.",
                Question = questionT2,
                Referencer = referencer5,
                QuestionGuid = questionT2.GuidId,
                ReferencerGuid = referencer5.GuidId,
            };
            var response23 = new Response()
            {
                Content = "5",
                Question = question2,
                Referencer = referencer5,
                QuestionGuid = question2.GuidId,
                ReferencerGuid = referencer5.GuidId,
            };
            var response24 = new Response()
            {
                Content = "5",
                Question = question3,
                Referencer = referencer5,
                QuestionGuid = question3.GuidId,
                ReferencerGuid = referencer5.GuidId,
            };
            var response25 = new Response()
            {
                Content = "5",
                Question = question4,
                Referencer = referencer5,
                QuestionGuid = question4.GuidId,
                ReferencerGuid = referencer5.GuidId,
            };
            var response26 = new Response()
            {
                Content = "5",
                Question = question5,
                Referencer = referencer5,
                QuestionGuid = question5.GuidId,
                ReferencerGuid = referencer5.GuidId,
            };
            var response27 = new Response()
            {
                Content = "5",
                Question = question6,
                Referencer = referencer5,
                QuestionGuid = question6.GuidId,
                ReferencerGuid = referencer5.GuidId,
            };

            _context.Responses.Add(responseT1);
            _context.Responses.Add(responseT2);
            _context.Responses.Add(response2);
            _context.Responses.Add(response3);
            _context.Responses.Add(response4);
            _context.Responses.Add(response5);
            _context.Responses.Add(response6);
            _context.Responses.Add(responseT4);
            _context.Responses.Add(responseT3);
            _context.Responses.Add(response8);
            _context.Responses.Add(response9);
            _context.Responses.Add(response10);
            _context.Responses.Add(response11);
            _context.Responses.Add(response12);
            _context.Responses.Add(responseT5);
            _context.Responses.Add(responseT6);
            _context.Responses.Add(response13);
            _context.Responses.Add(response14);
            _context.Responses.Add(response15);
            _context.Responses.Add(response16);
            _context.Responses.Add(response17);
            _context.Responses.Add(responseT7);
            _context.Responses.Add(responseT8);
            _context.Responses.Add(response18);
            _context.Responses.Add(response19);
            _context.Responses.Add(response20);
            _context.Responses.Add(response21);
            _context.Responses.Add(response22);
            _context.Responses.Add(responseT9);
            _context.Responses.Add(responseT10);
            _context.Responses.Add(response23);
            _context.Responses.Add(response24);
            _context.Responses.Add(response25);
            _context.Responses.Add(response26);
            _context.Responses.Add(response27);
            _context.SaveChanges();


        }
    }

}
