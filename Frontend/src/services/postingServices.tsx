
import { Posting, Candidate, Referencer, Response, Question } from "../Types";

export async function getPostings(): Promise<Posting[]>{
    const response = await fetch("http://localhost:5136/api/postings");
    const responsJson = await response.json() as Posting[];
    console.table(responsJson); // for testing
    return responsJson;
}

