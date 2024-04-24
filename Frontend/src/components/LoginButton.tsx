import { Link } from "react-router-dom";


export default function LoginButton( { isLoggedIn, userName }: Props){
    
    function getInitials(name: string) {
        const words = name.split(' ');
        const initials = words.map(word => word.charAt(0).toUpperCase()).join(' ');
        return initials;
    };

    return (
        <>
                        <div className="navbar-end">
                    {isLoggedIn ? (
                        <>
                            <details className="dropdown">
                                <summary className="m-1 btn text-xl">{userName ? getInitials(userName) : 'User'}</summary>
                                <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                                    <li><a className="text-base">log out</a></li>
                                </ul>
                            </details>
                        </>

                    ) : (
                        <Link to="/login">
                            <button className="btn text-xl">Log in</button>
                        </Link>
                    )}
                </div>
        
        </>
    )
}

type Props = {
    isLoggedIn: boolean;
    userName?: string;
}