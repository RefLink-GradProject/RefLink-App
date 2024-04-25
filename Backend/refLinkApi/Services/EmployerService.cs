using System.Security.Claims;
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

    public async Task<Employer?> GetEmployerInfo(string id)
    {
        var employer = await _context.Employers.FirstOrDefaultAsync(emp => emp.AuthId == id);
        return employer;
    }

    public async Task<Employer> CreateEmployerFromClaims(ClaimsPrincipal user)
    {
        var newEmployer = new Employer
        {
            AuthId = user.FindFirst(ClaimTypes.NameIdentifier)!.Value,
            Name = user.FindFirst(ClaimTypes.GivenName)!.Value,
            Email = user.FindFirst(ClaimTypes.Email)!.Value
        };
        
        _context.Employers.Add(newEmployer);
        await _context.SaveChangesAsync();

        return newEmployer;
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