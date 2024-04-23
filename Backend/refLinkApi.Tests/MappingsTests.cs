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
        Assert.NotNull(candidate.GuidId);
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
        Assert.NotNull(posting.GuidId);
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
        PostingResponseDto response = mapper.PostingToPostingRequestDto(posting);
        
        // Assert
        Assert.Equal(posting.Title, response.Title);
        Assert.NotNull(response.GuidId);
    }
}