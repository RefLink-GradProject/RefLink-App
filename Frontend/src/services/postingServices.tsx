
import { Posting, Candidate, Referencer, Response, Question } from "../Types";

export async function getPostings(): Promise<Posting[]>{
    const response = await fetch("http://localhost:5136/api/postings");
    const result = await response.json() as Posting[];
    // console.table(result); // for testing
    return result;
}

export async function getCandidates(): Promise<Candidate[]>{
    const response = await fetch("http://localhost:5136/api/candidates");
    const result = await response.json() as Candidate[];
    // console.table(result); // for testing
    return result;
}

