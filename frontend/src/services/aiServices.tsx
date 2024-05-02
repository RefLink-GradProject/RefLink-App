
export async function getAIAnswer(jobDescription: string): Promise<string> {
    const url = `https://reflink.azurewebsites.net/api/chat/${jobDescription}`;
    const response = await fetch(url);
    if (!response.ok)
        throw new Error("Failed to ask question")
    const result = await response.text();
    return result;
}

