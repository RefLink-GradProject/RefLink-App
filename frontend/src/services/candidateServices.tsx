import { Candidate, CandidateWithDetails } from "../Types";

export async function getCandidates(): Promise<Candidate[]> {
    const response = await fetch(`https://reflink.azurewebsites.net/api/candidates`);
    const result = await response.json() as Candidate[];
    // console.table(result); // for testing
    return result;
}

export async function getCandidateWithDetails(guidId: string): Promise<CandidateWithDetails> {
    const url = `https://reflink.azurewebsites.net/api/candidates/${guidId}/with-questions-responses`;
    const response = await fetch(url);
    const result = await response.json() as CandidateWithDetails;
    if(!response.ok)
        throw new Error("Failed to get candidate with details")
    return result;
}


export async function getCandidateById(guidId: string): Promise<Candidate> {
    const response = await fetch(`https://reflink.azurewebsites.net/api/candidates/${guidId}`);
    const result = await response.json() as Candidate;
    return result;
}

export async function postCandidate(data) {
    const response = await fetch(`https://reflink.azurewebsites.net/api/candidates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok)
        throw new Error("Failed to post new candidate!")
}

