
import { Posting } from "../Types";

export async function getPostings(): Promise<Posting[]> {
    console.log("[DEBUG] Getting postings")
    const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}api/postings`);
    const result = await response.json() as Posting[];
    // console.table(result); // for testing
    if (!response.ok)
        throw new Error("Failed to get postings!")
    return result;
}

export async function getOnePosting(guid: string): Promise<Posting> {
    console.log("[DEBUG] Getting postings")
    const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}api/postings/${guid}`);
    const result = await response.json() as Posting;
    if (!response.ok)
        throw new Error("Failed to get postings!")
    return result;
}



