
import { Posting, Candidate, Referencer, Response, Question } from "../Types";

export async function getPostings(): Promise<Posting[]>{
    const response = await fetch("http://localhost:5136/api/postings");
    const result = await response.json() as Posting[];
    // console.table(result); // for testing
    return result;
}


// -----------------Candidate------------------------
export async function getCandidates(): Promise<Candidate[]>{
    const response = await fetch("http://localhost:5136/api/candidates");
    const result = await response.json() as Candidate[];
    // console.table(result); // for testing
    return result;
}


export async function getCandidateById(guidId: string): Promise<Candidate>{
    const response = await fetch(`http://localhost:5136/api/candidates/${guidId}`);
    const result = await response.json() as Candidate;
    return result;
}

export async function postCandidate(name: string, email: string, postingGuid: string){
    const response = await fetch("http://localhost:5136/api/candidates",{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: name,
            email: email,
            postingGuid: postingGuid
        })
    });
    if(!response.ok)
        throw new Error("Failed to post new candidate!")
}
