export async function getAIAnswer(jobDescription: string): Promise<string>{
    const response = await fetch(`http://localhost:5136/api/chat/${jobDescription}`);
    if(!response.ok)
        throw new Error("Failed to post new candidate!")
    const result = await response.text();
    return result;
}

