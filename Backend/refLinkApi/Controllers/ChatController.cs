
using System.Text;
using Azure.AI.OpenAI;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace refLinkApi.Controllers;

using Azure.AI.OpenAI;


[Route("api/chat")]
[ApiController]
public class ChatController : ControllerBase
{
    private OpenAIClient _client;

    public ChatController(IConfiguration config)
    {
        string apiKey = config["ApiKeys:OpenAiApiKey"]!;
        Console.WriteLine("[DEBUG]: apiKey");
        Console.WriteLine(apiKey);
        if (string.IsNullOrEmpty(apiKey))
            throw new InvalidOperationException("OpenAI API key not found in environment variable OPENAI_API_KEY");
        _client = new(apiKey);
    }

    [HttpGet("{userInput}")]
    public async Task<ActionResult<string>> GetAIResponse(string userInput)
    {
            string completionResponse = await GenerateResponseAsync(userInput);
            return Content(completionResponse);
    }

    private async Task<string> GenerateResponseAsync(string userInput)
    {
        var propQuestion = "pretend you are a HR, and you are writing one question for the candidate's referencer to answer so that you know better of the candidate, max 20 words, do not put quotation marks around the answer,and here is the description of the job posting: " 
            + userInput;
        var response = "";
        var openAiResponse = await _client.GetChatCompletionsAsync("gpt-3.5-turbo",new ChatCompletionsOptions
        {
            Messages = { 
                new ChatMessage(ChatRole.System, 
                propQuestion
            ) }
        });

        foreach (var choice in openAiResponse.Value.Choices)
        {
            response += choice.Message.Content;
        }
        return response;
    }
}
