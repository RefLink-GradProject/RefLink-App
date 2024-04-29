import { IdToken } from "@auth0/auth0-react";
import { Employer } from "../Types";

export async function getEmployerByToken(token: IdToken) : Promise<Employer | null> {   
    if(!token){
        return null
    }
    const response = await fetch('http://localhost:5136/api/Employers', {
        headers: {
          "Authorization": "Bearer " + token!.__raw
        }
      });
    console.log(response)
    const employer = await response.json()
    return employer;
  }