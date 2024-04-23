using refLinkApi.Dtos;
using refLinkApi.Dtos.Mappers;
using refLinkApi.Models;

namespace refLInkApi.Tests;

public class MappingsTests
{
    [Fact]
    public void Candidate_CanBeConvertedTo_CandidateResponseDTO()
    {
        // Arrange
        var mapper = new Mapper();
        Candidate candidate = new Candidate
        {
            Id = 1,
            Name = "Test",
            Email = "test@test.com",
            GuidId = default
        };
        
        // Act
        CandidateResponseDto response = mapper.CandidateToCandidateResponseDto(candidate);
        
        // Assert
        Assert.Equal(candidate.Name, response.Name);
    }
}