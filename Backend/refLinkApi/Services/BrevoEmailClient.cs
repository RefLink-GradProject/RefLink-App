using System.Text.Json;
using RestSharp;

namespace refLinkApi.Services;

// TODO: Implement IDisposable
public class BrevoEmailClient : IBrevoClient
{
    private readonly RestClient _client;
    private readonly string _apiSecret;

    public BrevoEmailClient(IConfiguration config)
    {
        var options = new RestClientOptions("https://api.brevo.com/v3/smtp/email");
        _client = new RestClient(options);
        _apiSecret = config["ApiKeys:BrevoApiKey"];
    }

    public async Task SendEmail(EmailTemplateRequest emailDetails)
    {
        Console.WriteLine("Sending an email");
        var request = new RestRequest("");
        request.AddHeader("accept", "application/json");
        request.AddHeader("api-key", _apiSecret);
        request.AddJsonBody(JsonSerializer.Serialize(emailDetails));
        var response = await _client.PostAsync(request);
    }
}