import { IdToken } from "@auth0/auth0-react";


export const GetUserInfo= async (token : string) => {
    const url = `http://localhost:5136/api/Auth/employer`;
    
    const response = await fetch(url, {
      headers: {
        "Authorization": "Bearer " + token
      },
    });
  
    if (!response.ok) {
      return response.text().then((text) => {
        throw new Error(text);
      });
    }
    const user = await response.json()
    return user;
  };
