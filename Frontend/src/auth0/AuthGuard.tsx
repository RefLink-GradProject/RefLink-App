import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Loader } from "../components/Loader";
import { Navigate } from "react-router-dom";


export const AuthGuard = ({ component, ...props }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <Loader />
    ),
  });

  return <Component {...props} />;
};

