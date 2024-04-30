import { withAuthenticationRequired } from "@auth0/auth0-react";
import { CallbackPage } from "./Callback";
import { Navigate } from "react-router-dom";


export const AuthGuard = ({ component, employer, auth, ...props }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <CallbackPage />
    ),
  });
  
  if (!employer && auth) {
    console.log("why am i hereeee")
    return <Navigate to="/register" replace />
  }

  return <Component {...props} />;
};

