export async function getAIAnswer(jobDescription: string): Promise<string> {
    const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/api/chat/${jobDescription}`);
    if (!response.ok)
        throw new Error("Failed to ask question")
    const result = await response.text();
    return result;
}

