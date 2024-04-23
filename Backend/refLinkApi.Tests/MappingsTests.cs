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
}