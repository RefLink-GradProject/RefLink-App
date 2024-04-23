using refLinkApi.Models;
using refLinkApi.Dtos;
using Microsoft.EntityFrameworkCore;

namespace refLinkApi.Services;

public class EmployerService
{
    private readonly RefLinkContext _context;

    public EmployerService(RefLinkContext context)
    {
        _context = context;
    }

    public async Task<Employer> PostNewEmployer(Employer employer)
    {
        if (_context.Employers == null)
        {
            return null;
        }

        _context.Employers.Add(employer);
        await _context.SaveChangesAsync();
        return employer;
    }

    public async Task<List<Employer>> GetEmployers()
    {
        if (_context.Employers is null)
        {
            return null;
        }

        var employers = await _context.Employers.ToListAsync();
        return employers;
    }

    public async Task<Employer> GetEmployerById(int id)
    {
        if (_context.Employers is null)
        {
            return null;
        }

        var employer = await _context.Employers.FirstOrDefaultAsync(r => r.Id == id);
        return employer;
    }
}