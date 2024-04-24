using refLinkApi.Models;
using refLinkApi.Dtos;
using Microsoft.EntityFrameworkCore;
using refLinkApi.Dtos.Mappers;

namespace refLinkApi.Services;

public class EmployerService
{
    private readonly RefLinkContext _context;
    private readonly Mapper mapper;

    public EmployerService(RefLinkContext context)
    {
        _context = context;
        mapper = new Mapper();
    }

    public async Task<EmployerResponseDto> PostNewEmployer(EmployerRequestDto employerRequestDto)
    {
        if (_context.Employers == null)
        {
            return null;
        }

        Employer employer = mapper.EmployerRequestDtoToEmployer(employerRequestDto);
        _context.Employers.Add(employer);
        await _context.SaveChangesAsync();
        return mapper.EmployerToEmployerResponseDto(employer);
    }

    public async Task<List<EmployerResponseDto>> GetEmployers()
    {
        if (_context.Employers is null)
        {
            return null;
        }

        var employers = await _context.Employers.ToListAsync();
        List<EmployerResponseDto> employerResponseDtos = [];
        foreach (Employer employer in employers)
        {
            employerResponseDtos.Add(mapper.EmployerToEmployerResponseDto(employer));
        }
        return employerResponseDtos;
    }

    public async Task<EmployerResponseDto> GetEmployerById(Guid guidId)
    {
        if (_context.Employers is null)
        {
            return null;
        }

        var employer = await _context.Employers.FirstOrDefaultAsync(r => r.GuidId == guidId);
        return mapper.EmployerToEmployerResponseDto(employer);
    }
}