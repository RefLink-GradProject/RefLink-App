import { withAuthenticationRequired } from "@auth0/auth0-react";
import { CallbackPage } from "./Callback";


export const AuthGaurd = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (      
        <CallbackPage/>
    ),

  });

  return <Component />;
};