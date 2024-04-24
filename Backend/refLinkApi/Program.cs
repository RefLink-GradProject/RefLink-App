using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using refLinkApi.Services;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<RefLinkContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("RefLinkContext") ?? throw new InvalidOperationException("Connection string 'RefLinkContext' not found.")));

// Add services to the container.

builder.Services.AddScoped<EmployerService>();
builder.Services.AddControllers();
builder.Services.AddCors();
builder.Services.AddEndpointsApiExplorer();


var domain = $"https://{builder.Configuration["Auth0:Domain"]}/";
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = domain;
        options.Audience = builder.Configuration["Auth0:Audience"];
        options.TokenValidationParameters = new TokenValidationParameters
        {
            NameClaimType = ClaimTypes.NameIdentifier
        };
    });

var JwtSecurityScheme = new OpenApiSecurityScheme()
{
    Type = SecuritySchemeType.Http,
    Scheme = "bearer"
};
var JwtSecurityRequirement = new OpenApiSecurityRequirement()
{
    [new() { Reference = new() { Type = ReferenceType.SecurityScheme, Id = "Bearer"} }] = []
};

builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", JwtSecurityScheme);
    options.AddSecurityRequirement(JwtSecurityRequirement);
});

// Create app
var app = builder.Build();

app.UseCors(builder => builder
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    SeedData.Initialize(services);
}

// Configure the HTTP request pipeline.

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
