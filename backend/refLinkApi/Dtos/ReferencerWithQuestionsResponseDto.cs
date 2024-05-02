namespace refLinkApi.Dtos;

public class ReferencerWithQuestionsResponseDto
{
    public ReferencerResponseDto Referencer { get; set; }
    public List<QuestionResponseDto> Questions { get; set; }
}