import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export const Auth0ProviderWithNavigate = ({ children }) => {
  const navigate = useNavigate();

  const domain = "dev-5u6q7n8kc0ytrj48.us.auth0.com";
  const clientId = "FI9oxO12W4vxfL1gh2PG6XXJIgbLj284";
  const redirectUri = "https://localhost:5000/callback";
  //   const redirectUri = "https://icy-smoke-0b04e3303.5.azurestaticapps.net/callback";

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  if (!(domain && clientId && redirectUri)) {
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};