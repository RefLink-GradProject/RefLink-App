import { Candidate, CandidateWithDetails } from "../Types";

export async function getCandidates(): Promise<Candidate[]> {
    const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}api/candidates`);
    const result = await response.json() as Candidate[];
    // console.table(result); // for testing
    return result;
}

export async function getCandidateWithDetails(guidId: string): Promise<CandidateWithDetails> {
    const url = `${import.meta.env.VITE_API_SERVER_URL}api/candidates/${guidId}/with-questions-responses`;
    const response = await fetch(url);
    const result = await response.json() as CandidateWithDetails;
    if(!response.ok)
        throw new Error("Failed to get candidate with details")
    return result;
}


export async function getCandidateById(guidId: string): Promise<Candidate> {
    const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}api/candidates/${guidId}`);
    const result = await response.json() as Candidate;
    return result;
}

export async function postCandidate(data) {
    const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}api/candidates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok)
        throw new Error("Failed to post new candidate!")
}

