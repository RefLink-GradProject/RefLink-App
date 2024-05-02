using refLinkApi.Dtos;

namespace refLinkApi.Services;

public interface IQuestionService
{
    public Task<QuestionResponseDto> PostNewQuestion(QuestionRequestDto postingRequestDto);
    public Task<List<QuestionResponseDto>> GetQuestions();
    public Task<QuestionResponseDto> GetQuestionByGuid(Guid guidId);
}