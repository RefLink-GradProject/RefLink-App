using refLinkApi.Models;
using refLinkApi.Dtos;
using refLinkApi.Dtos.Mappers;
using Microsoft.EntityFrameworkCore;

namespace refLinkApi.Services;

public class CandidateService
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
        // CandidateResponseDto[] candidateResponseDtos = [];
        // foreach (Candidate candidate in candidates)
        // {
        //     candidateResponseDtos
        // }
        // return candidates;
        return null;
    }

    public async Task<CandidateResponseDto> GetCandidateById(int id)
    {
        if (_context.Candidates is null)
        {
            return null;
        }

        // var employer = await _context.Employers.FirstOrDefaultAsync(r => r.Id == id);
        // return employer;
        return null;
    }
}