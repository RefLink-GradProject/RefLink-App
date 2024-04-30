export async function getAIAnswer(jobDescription: string): Promise<string> {
    const url = `${import.meta.env.VITE_API_SERVER_URL}api/chat/${jobDescription}`;
    const response = await fetch(url);
    // const response = await fetch(`http://localhost:5136/api/chat/${jobDescription}`);
    if (!response.ok)
        throw new Error("Failed to ask question")
    const result = await response.text();
    return result;
}

