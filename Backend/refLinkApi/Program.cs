using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using refLinkApi.Services;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<RefLinkContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("RefLinkContext") ?? throw new InvalidOperationException("Connection string 'RefLinkContext' not found.")));

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<EmployerService>();
builder.Services.AddScoped<ICandidateService, CandidateService>();
builder.Services.AddScoped<IPostingService, PostingService>();
builder.Services.AddScoped<IQuestionService, QuestionService>();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    SeedData.Initialize(services);
}

// Configure the HTTP request pipeline.

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
