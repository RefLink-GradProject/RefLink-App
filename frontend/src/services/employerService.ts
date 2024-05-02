import { IdToken } from "@auth0/auth0-react";
import { Employer } from "../Types";

export async function getEmployerByToken(token: IdToken) : Promise<Employer | null> {   
    if(!token){
        return null
    }
    const response = await fetch(`https://reflink.azurewebsites.net/api/Employers`, {
        headers: {
          "Authorization": "Bearer " + token!.__raw
        }
      });
      if(response.status==404)
        return null
    const employer = await response.json()
    return employer;
  }

export async function postEmployerByToken(token: IdToken, data: any) : Promise<Employer | null> {   
  if(!token){
      return null
  }
  const response = await fetch(`https://reflink.azurewebsites.net/api/Employers`, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + token!.__raw
      },
      method: "POST",
      body: JSON.stringify(data)
    });
  console.log(response)
  const employer = await response.json()
  return employer;
}
  
  