import { Link } from "react-router-dom";
import logo from '../assets/logo.png'
import LoginButton from "./LoginButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'


export default function Navbar({ userName }: Props) {

    return (
        <>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <Link to="/"><li><a>Home</a></li></Link>
                            <li>
                                <Link to="/postings"><a>Postings</a></Link>
                                <ul className="p-2">
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </li>
                            <li>
                                <Link to="/dashboard">
                                    <a>Dashboard</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <Link to="/">
                        <a className="btn btn-ghost text-3xl">
                        <FontAwesomeIcon icon={faLink} size="lg" />
                            RefLink
                        </a>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-xl">
                        <Link to="/"><li><a>Home</a></li></Link>
                        <li><Link to="/postings"><a>Postings</a></Link></li>
                        <li>
                            <details>
                                <summary>Drop down</summary>
                                <ul className="p-2">
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </details>
                        </li>
                        <li>
                            <Link to="/dashboard">
                                <a>Dashboard</a>
                            </Link>
                        </li>
                    </ul>
                </div>
                
                <LoginButton userName={userName} />


            </div>

        </>
    )
}


type Props = {
    userName?: string;
}