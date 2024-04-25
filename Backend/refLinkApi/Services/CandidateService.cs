using refLinkApi.Models;
using refLinkApi.Dtos;
using refLinkApi.Dtos.Mappers;
using Microsoft.EntityFrameworkCore;

namespace refLinkApi.Services;

public class CandidateService : ICandidateService
{
    private readonly RefLinkContext _context;
    private readonly MapperlyMapper mapper;

    public CandidateService(RefLinkContext context)
    {
        _context = context;
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
            .Candidates
            .Include(candidate => candidate.Posting)
            .ThenInclude(posting => posting.Questions)!
            .ThenInclude(question => question.Responses)!
            .ThenInclude(response => response.Referencer).Include(candidate => candidate.Referencers)
            .FirstOrDefaultAsync(candidate => candidate.GuidId == guidId);
        
        var response = new CandidateDetailedResponseDto()
        {
            GuidId = candidate.GuidId,
            Name = candidate.Name,
            Email = candidate.Email,
            Referencers = new List<RespondersWithQuestionsAndAnswersDto>()
        };

        foreach (var referencer in candidate.Referencers)
        {
            var referencerDetails = new RespondersWithQuestionsAndAnswersDto()
            {
                GuidId = referencer.GuidId,
                Name = referencer.Name,
                Responses = new List<QuestionAndResponsePairDto>(),
            };

            foreach (var answer in referencer.Responses)
            {
                var questionResponse = new QuestionAndResponsePairDto()
                {
                    QuestionContent = answer.Question.Content,
                    QuestionGuidId = answer.Question.GuidId,
                    ResponseContent = answer.Content,
                    ResponseGuidId = answer.GuidId,
                };

                referencerDetails.Responses.Add(questionResponse);
            }
        }

        return response;
    }
}



// var response = new CandidateDetailedResponseDto()
// {
//     GuidId = candidate.GuidId,
//     Name = candidate.Name,
//     Email = candidate.Email,
//     Questions = new List<QuestionWithResponsesAndRespondersDto>()
// };
//
// foreach (var question in candidate.Posting.Questions)
// {
//     var questionWithResponsesDto = new QuestionWithResponsesAndRespondersDto()
//     {
//         QuestionContent = question.Content,
//         QuestionGuidId = question.GuidId,
//         Responses = new List<QuestionResponsesResponseDto>()
//     };
//     
//     response.Questions.Add(questionWithResponsesDto);
//
//     foreach (var answer in question.Responses)
//     {
//         var questionResponsePairDto = new QuestionResponsesResponseDto()
//         {
//             ResponseContent = answer.Content,
//             ResponseGuid = answer.GuidId,
//             Referencer = answer.Referencer.Name,
//             ReferencerGuid = answer.Referencer.GuidId,
//         };
//         
//         questionWithResponsesDto.Responses.Add(questionResponsePairDto);
//     }
// }