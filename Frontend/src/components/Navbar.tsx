import { Link } from "react-router-dom";
import logo from '../assets/logo.png'

export default function Navbar({ isLoggedIn, userName }: Props) {


    function getInitials(name: string) {
        const words = name.split(' ');
        const initials = words.map(word => word.charAt(0).toUpperCase()).join(' ');
        return initials;
    };

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
                            <img src={logo} alt="logo" className="w-8" />
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
            </div>
        </>
    )
}


type Props = {
    isLoggedIn: boolean;
    userName?: string;
}