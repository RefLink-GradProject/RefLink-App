import { useAuth0 } from "@auth0/auth0-react";

export const LoginButtonDown = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/postings",
      },
    });
  };

  return (
    <button className="btn btn-xs w-14 md:w-20 md:btn-lg text-sm md:text-lg mr-3 w-24 md:btn-lg md:w-32 md:mr-6 animate-flip-up animate-delay-500" onClick={handleLogin}>
      Log In
    </button>
  );
};