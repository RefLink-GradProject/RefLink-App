using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using refLinkApi.Services;

namespace refLinkApi.Controllers;


[Route("api/[controller]")]
[ApiController]
public class AuthController(EmployerService service) : ControllerBase
{
    
    [HttpGet("employer")]
    [Authorize]
    public async Task<IActionResult> EmployerExists()
    {
        var employer = await service.GetEmployerInfo(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        if (employer == null)
        {
             var newemployer = await service.CreateEmployerFromClaims(User);
             return Ok(newemployer);
        }
        return Ok(employer);
    }
}