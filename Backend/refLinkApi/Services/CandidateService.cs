using refLinkApi.Models;
using refLinkApi.Dtos;
using refLinkApi.Dtos.Mappers;
using Microsoft.EntityFrameworkCore;

namespace refLinkApi.Services;

public class CandidateService : ICandidateService
{
    private readonly RefLinkContext _context;
    private readonly IBrevoClient _emailClient;
    private readonly MapperlyMapper mapper;

    public CandidateService(RefLinkContext context, IBrevoClient emailClient)
    {
        _context = context;
        _emailClient = emailClient;
        mapper = new MapperlyMapper();
    }

    public async Task<CandidateResponseDto> PostNewCandidate(CandidateRequestDto candidateRequestDto)
    {
        if (_context.Candidates == null)
        {
            return null;
        }

        Candidate candidate = mapper.CandidateRequestDtoToCandidate(candidateRequestDto);
        _context.Candidates.Add(candidate);
        await _context.SaveChangesAsync();
        
        // TODO: create mapper for this
        var emailRequest = new EmailTemplateRequest
        {
            To = new List<EmailTemplateRequest.RecipientRecord>
            {
                new EmailTemplateRequest.RecipientRecord()
                {
                    Name = candidate.Name,
                    Email = candidate.Email,
                }
            },
            Params = new EmailTemplateRequest.ParamsRecord()
            {
                FNAME = candidate.Name,
                URL = $"https://localhost:5000/add-referencer/{candidate.GuidId}"
            },
            TemplateId = 2,
        };
        
        Console.WriteLine("Sending email: ");
        Console.WriteLine($"{candidate.Email}");
        await _emailClient.SendEmail(emailRequest);

        return mapper.CandidateToCandidateResponseDto(candidate);
    }

    public async Task<List<CandidateResponseDto>> GetCandidates()
    {
        if (_context.Candidates is null)
        {
            return null;
        }

        var candidates = await _context.Candidates.ToListAsync();
        List<CandidateResponseDto> candidateResponseDtos = [];
        foreach (Candidate candidate in candidates)
        {
            candidateResponseDtos.Add(mapper.CandidateToCandidateResponseDto(candidate));
        }
        return candidateResponseDtos;
    }

    public async Task<CandidateResponseDto> GetCandidateByGuid(Guid guidId)
    {
        if (_context.Candidates is null)
        {
            return null;
        }

        var candidate = await _context.Candidates.FirstOrDefaultAsync(r => r.GuidId == guidId);
        return mapper.CandidateToCandidateResponseDto(candidate);
    }
    
    public async Task<CandidateDetailedResponseDto> GetCandidateByGuidWithQuestionsResponses(Guid guidId)
    {
        if (_context.Candidates is null)
        {
            return null;
        }

        var candidate = await _context
            .Candidates.Include(candidate => candidate.Referencers)
            .ThenInclude(referencer => referencer.Responses)
            .ThenInclude(response => response.Question)
            // also include response.RatingQuesion here
            .FirstOrDefaultAsync(candidate => candidate.GuidId == guidId);
        
        var response = new CandidateDetailedResponseDto()
        {
            GuidId = candidate.GuidId,
            Name = candidate.Name,
            Email = candidate.Email,
            Referencers = new List<ReferencersWithQuestionsAndAnswersDto>()
        };

        foreach (var referencer in candidate.Referencers)
        {
            var referencerDetails = new ReferencersWithQuestionsAndAnswersDto()
            {
                GuidId = referencer.GuidId,
                Name = referencer.Name,
                Responses = new List<QuestionAndResponsePairDto>(),
            };
            
            response.Referencers.Add(referencerDetails);

            foreach (var answer in referencer.Responses)
            {
                var questionResponse = new QuestionAndResponsePairDto()
                {
                    QuestionContent = answer.Question.Content,
                    QuestionGuidId = answer.Question.GuidId,
                    Type = answer.Question.Type,
                    ResponseContent = answer.Content,
                    ResponseGuidId = answer.GuidId,
                };

                referencerDetails.Responses.Add(questionResponse);
            }
        }

        return response;
    }
}