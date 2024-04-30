
import { Posting} from "../Types";

export async function getPostings(): Promise<Posting[]>{
    const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}api/postings`);
    const result = await response.json() as Posting[];
    // console.table(result); // for testing
    if(!response.ok)
        throw new Error("Failed to get postings!")
    return result;
}



