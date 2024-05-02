import { useAuth0 } from "@auth0/auth0-react";

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/register",
      },
    });
  };

  return (
    <button className="btn mr-3 w-24 md:btn-lg md:w-32 md:mr-6 animate-flip-up animate-delay-500" onClick={handleLogin}>
      Log In
    </button>
  );
};