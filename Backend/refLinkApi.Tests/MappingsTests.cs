using refLinkApi.Dtos;
using refLinkApi.Dtos.Mappers;
using refLinkApi.Models;

namespace refLInkApi.Tests;

public class MappingsTests
{
    [Fact]
    public void Candidate_CanBeMappedTo_CandidateResponseDTO()
    {
        // Arrange
        var mapper = new Mapper();
        Candidate candidate = new Candidate
        {
            Id = 1,
            Name = "Test",
            Email = "test@test.com",
            GuidId = Guid.NewGuid(),
        };
        
        // Act
        CandidateResponseDto response = mapper.CandidateToCandidateResponseDto(candidate);
        
        // Assert
        Assert.Equal(candidate.Name, response.Name);
    }
    
    [Fact]
    public void CandidateRequestDto_CanBeMappedTo_Candidate()
    {
        // Arrange
        var mapper = new Mapper();
        CandidateRequestDto request = new CandidateRequestDto()
        {
            Name = "Test",
            Email = "test@test.com"
        };
        
        // Act
        Candidate candidate = mapper.CandidateRequestDtoToCandidate(request);
        
        // Assert
        Assert.Equal(candidate.Email, request.Email);
    }
    
    [Fact]
    public void PostingRequestDto_CanBeMappedTo_Posting()
    {
        // Arrange
        var mapper = new Mapper();
        PostingRequestDto request = new PostingRequestDto
        {
            Title = "TestTitle",
            Description = "TestDescription"
        };
        
        // Act
        Posting posting = mapper.PostingRequestDtoToPosting(request);
        
        // Assert
        Assert.Equal(posting.Title, request.Title);
    }
    
    [Fact]
    public void Posting_CanBeMappedTo_PostingResponseDto()
    {
        // Arrange
        var mapper = new Mapper();
        Posting posting = new Posting
        {
            Title = "TestTitle",
            Description = "TestDescription"
        };
        
        // Act
        PostingResponseDto response = mapper.PostingToPostingResponseDto(posting);
        
        // Assert
        Assert.Equal(posting.Title, response.Title);
    }
    
    [Fact]
    public void Question_CanBeMappedTo_QuestionResponseDto()
    {
        // Arrange
        var mapper = new Mapper();
        Question question = new Question
        {
            Content = "ContentTest"
        };
        
        // Act
        QuestionResponseDto response = mapper.QuestionToQuestionResponseDto(question);
        
        // Assert
        Assert.Equal(question.Content, response.Content);
    }
    
    [Fact]
    public void QuestionRequestDto_CanBeMappedTo_Question()
    {
        // Arrange
        var mapper = new Mapper();
        QuestionRequestDto request = new QuestionRequestDto()
        {
            Content = "ContentTest"
        };
        
        // Act
        Question question = mapper.QuestionRequestDtoToQuestion(request);
        
        // Assert
        Assert.Equal(question.Content, request.Content);
    }
    
    [Fact]
    public void Referencer_CanBeMappedTo_ReferencerResponseDto()
    {
        // Arrange
        var mapper = new Mapper();
        Referencer referencer = new Referencer
        {
            Name = "ReferencerName",
            Email = "ReferencerEmail",
        };
        
        // Act
        ReferencerResponseDto response = mapper.ReferencerToReferencerResponseDto(referencer);
        
        // Assert
        Assert.Equal(referencer.Name, response.Name);
    }
    
    [Fact]
    public void ReferencerRequestDto_CanBeMappedTo_Referencer()
    {
        // Arrange
        var mapper = new Mapper();
        ReferencerRequestDto request = new ReferencerRequestDto()
        {
            Name = "ReferencerName",
            Email = "ReferencerEmail",
        };
        
        // Act
        Referencer referencer = mapper.ReferencerRequestDtoToReferencer(request);
        
        // Assert
        Assert.Equal(referencer.Name, request.Name);
    }
    
    [Fact]
    public void Response_CanBeMappedTo_ResponseResponseDto()
    {
        // Arrange
        var mapper = new Mapper();
        Response referencer = new Response
        {
            GuidId = Guid.NewGuid(),
            Content = "Content",
        };
        
        // Act
        ResponseResponseDto response = mapper.ResponseToResponseResponseDto(referencer);
        
        // Assert
        Assert.Equal(referencer.Content, response.Content);
    }
    
    [Fact]
    public void ResponseRequestDto_CanBeMappedTo_Response()
    {
        // Arrange
        var mapper = new Mapper();
        ResponseRequestDto request = new ResponseRequestDto()
        {
            Content = "Content",
        };
        
        // Act
        Response referencer = mapper.ResponseRequestDtoToResponse(request);
        
        // Assert
        Assert.Equal(referencer.Content, request.Content);
    }
    
    [Fact]
    public void Employer_CanBeMappedTo_EmployerResponseDto()
    {
        // Arrange
        var mapper = new Mapper();
        Employer employer = new Employer
        {
            Id = 1,
            Name = "TestName",
            GuidId = Guid.NewGuid(),
            Company = "Company",
            Email = "test@test.com"
        };
        
        // Act
        EmployerResponseDto response = mapper.EmployerToEmployerResponseDto(employer);
        
        // Assert
        Assert.Equal(employer.GuidId, response.GuidId);
    }
    
    [Fact]
    public void EmployerRequestDto_CanBeMappedTo_Employer()
    {
        // Arrange
        var mapper = new Mapper();
        EmployerRequestDto request = new EmployerRequestDto()
        {
            Name = "TestName",
            Company = "Company",
            Email = "test@test.com"
        };
        
        // Act
        Employer employer = mapper.EmployerRequestDtoToEmployer(request);
        
        // Assert
        Assert.Equal(employer.Company, request.Company);
    }
}