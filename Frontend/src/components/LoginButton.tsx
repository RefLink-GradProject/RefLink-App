
import { useAuth0 } from "@auth0/auth0-react";

export default function LoginButton({ userName }: Props) {
    const { isAuthenticated, logout, loginWithRedirect } = useAuth0();

    function getInitials(name: string) {
        const words = name.split(' ');
        const initials = words.map(word => word.charAt(0).toUpperCase()).join(' ');
        return initials;
    };

    return (
        <>
            <div className="navbar-end">
                {isAuthenticated ? (
                    <>
                        <details className="dropdown">
                            <summary className="m-1 btn text-xl">{userName ? getInitials(userName) : 'User'}</summary>
                            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                                <li>
                                    <a className="text-base">
                                        <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                                            log out
                                        </button>
                                    </a>
                                </li>
                            </ul>
                        </details>
                    </>

                ) : (
                    <button className="btn btn-sm md:btn md:text-xl " onClick={() => loginWithRedirect()}>Log in</button>
                )}
            </div>

        </>
    )
}

type Props = {
    userName?: string;
}