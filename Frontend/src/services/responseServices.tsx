export async function postResponse(content: string, questionGuid: string){
    const response = await fetch("http://localhost:5136/api/responses",{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            content:content,
            questionGuid: questionGuid
        })
    });
    if(!response.ok){
        throw new Error("Failed to post new candidate!")
    }
}
