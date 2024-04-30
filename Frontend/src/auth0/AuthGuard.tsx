import { withAuthenticationRequired } from "@auth0/auth0-react";
import { CallbackPage } from "./Callback";
import { Navigate } from "react-router-dom";


export const AuthGuard = ({ component, ...props }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <CallbackPage />
    ),
  });

  return <Component {...props} />;
};

