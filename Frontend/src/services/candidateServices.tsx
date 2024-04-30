import { Candidate, CandidateWithDetails } from "../Types";
import { fakeCandidate1WithDetailsDavid, fakeCandidate1WithDetailsEmby } from "../fakeData";

export async function getCandidates(): Promise<Candidate[]>{
    const response = await fetch("http://localhost:5136/api/candidates");
    const result = await response.json() as Candidate[];
    // console.table(result); // for testing
    return result;
}

export async function getCandidateWithDetails(guidId: string): Promise<CandidateWithDetails>{
    const response = await fetch(`http://localhost:5136/api/candidates/${guidId}/with-questions-responses`);
    const result = await response.json() as CandidateWithDetails;
// fake data for texting
    if(!response.ok){
        if(guidId == "103")
            return fakeCandidate1WithDetailsEmby;
        if(guidId == "104")
            return fakeCandidate1WithDetailsDavid
    }
// -------------------- 
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

