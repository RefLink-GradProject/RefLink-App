import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'


export default function NavbarClean({ userName }: Props) {

    return (
        <>
            <div className="navbar mb-10 md:mb-10  animate-fade-down">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                    </div>
                    <Link to="/">
                        <a className="btn btn-ghost text-lg md:text-2xl lg:text-3xl w-32 md:w-40 lg:w-48">
                        <FontAwesomeIcon icon={faLink} size="sm" />
                            RefLink
                        </a>
                    </Link>
                </div>
                
                <LoginButton userName={userName} />


            </div>

        </>
    )
}


type Props = {
    userName?: string;
}