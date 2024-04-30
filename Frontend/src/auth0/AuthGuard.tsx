import { withAuthenticationRequired } from "@auth0/auth0-react";
import { CallbackPage } from "./Callback";
import Register from "../Register";
import { Navigate } from "react-router-dom";
import { getEmployerByToken } from "../services/employerService";
import ChartsDraft from "../components/ChartsDraft";


export const AuthGuard = ({ component, employer, auth, ...props }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <CallbackPage />
    ),
  });

  console.log(employer)
  console.log(auth)
  if (!employer && auth) {
    console.log("why am i hereeee")
    return <Navigate to="/register" replace />
  }
  else
    return <Component {...props} />;
};

