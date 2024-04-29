using refLinkApi.Dtos;

namespace refLinkApi.Services;

public interface IRatingQuestionService
{
    public Task<RatingQuestionResponseDto> PostNewQuestion(RatingQuestionRequestDto postingRequestDto);
    public Task<List<RatingQuestionResponseDto>> GetQuestions();
    public Task<RatingQuestionResponseDto> GetQuestionByGuid(Guid guidId);
}