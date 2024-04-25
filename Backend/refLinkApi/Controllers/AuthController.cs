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
        var employer;
            employer = await service.GetEmployerInfo(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        if (employer == null)
        {
             await service.CreateEmployerFromClaims(User);
        }
        return Ok();
    }
}