import { withAuthenticationRequired } from "@auth0/auth0-react";
import { CallbackPage } from "./Callback";
import Register from "../Register";
import { Navigate } from "react-router-dom";


export const AuthGuard = ({ component, employer, ...props  }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (      
        <CallbackPage/>
    ),
  });
  console.log(employer)
 
  return <Component {...props}/> ;
};

