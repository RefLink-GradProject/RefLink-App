
import { Posting } from "../Types";

export async function getPostings(): Promise<Posting[]> {
    console.log("[DEBUG] Getting postings")
    const response = await fetch(`https://reflink.azurewebsites.net/api/postings`);
    const result = await response.json() as Posting[];
    // console.table(result); // for testing
    if (!response.ok)
        throw new Error("Failed to get postings!")
    return result;
}

export async function getOnePosting(guid: string): Promise<Posting> {
    console.log("[DEBUG] Getting postings")
    const response = await fetch(`https://reflink.azurewebsites.net/api/postings/${guid}`);
    const result = await response.json() as Posting;
    if (!response.ok)
        throw new Error("Failed to get postings!")
    return result;
}



