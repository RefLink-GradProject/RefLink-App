import { useAuth0 } from "@auth0/auth0-react";

export const SignupButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/postings",
      },
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  };

  return (
    <button className="btn btn-neutral w-24 md:btn-lg md:w-32 animate-flip-up animate-delay-500" onClick={handleSignUp}>
      Sign Up
    </button>
  );
};