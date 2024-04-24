using refLinkApi.Models;
using refLinkApi.Dtos;
using refLinkApi.Dtos.Mappers;
using Microsoft.EntityFrameworkCore;

namespace refLinkApi.Services;

public class CandidateService : ICandidateService
{
    private readonly RefLinkContext _context;
    private readonly Mapper mapper;

    public CandidateService(RefLinkContext context)
    {
        _context = context;
        mapper = new Mapper();
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
}