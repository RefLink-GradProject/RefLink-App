import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Loader } from "../components/Loader";

export const AuthGuard = ({ component , ...props }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <Loader />
    ),
  });

  return <Component {...props} />;
};

