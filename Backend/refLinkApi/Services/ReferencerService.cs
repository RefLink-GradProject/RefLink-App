using Microsoft.EntityFrameworkCore;
using refLinkApi.Dtos;
using refLinkApi.Dtos.Mappers;
using refLinkApi.Models;

namespace refLinkApi.Services;

public class ReferencerService : IReferencerService
{
    private readonly RefLinkContext _context;
    private readonly Mapper mapper;

    public ReferencerService(RefLinkContext context)
    {
        _context = context;
        mapper = new Mapper();
    }
    
    public async Task<ReferencerResponseDto> PostNewReferencer(ReferencerRequestDto referencerRequestDto)
    {
        if (_context.Referencers == null)
        {
            return null;
        }
        
        var referencer = mapper.ReferencerRequestDtoToReferencer(referencerRequestDto);
        _context.Referencers.Add(referencer);
        await _context.SaveChangesAsync();

        return mapper.ReferencerToReferencerResponseDto(referencer);
    }

    public async Task<List<ReferencerResponseDto>> GetReferencers()
    {
        if (_context.Referencers is null)
        {
            return null;
        }

        var referencers = await _context.Referencers.ToListAsync();
        List<ReferencerResponseDto> referencerResponseDtos = [];
        foreach (Referencer referencer in referencers)
        {
            referencerResponseDtos.Add(mapper.ReferencerToReferencerResponseDto(referencer));
        }
        return referencerResponseDtos;
    }

    public async Task<ReferencerResponseDto> GetReferencerByGuid(Guid guidId)
    {
        if (_context.Referencers is null)
        {
            return null;
        }

        var referencer = await _context.Referencers.FirstOrDefaultAsync(r => r.GuidId == guidId);
        return mapper.ReferencerToReferencerResponseDto(referencer);
    }
}