import { Link } from "react-router-dom";
import logo from '../assets/logo.png'

export default function Navbar() {
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
                               <Link to="/positions"><a>Postings</a></Link>
                                <ul className="p-2">
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </li>
                            <li><a>Candidates</a></li>
                        </ul>
                    </div>
                    <Link to="/">
                        <a className="btn btn-ghost text-3xl">
                        <img src={logo} alt="logo" className="w-8"/>
                            RefLink
                        </a>
                        </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-xl">
                        <Link to="/"><li><a>Home</a></li></Link>
                        <li><Link to="/positions"><a>Postings</a></Link></li>
                        <li>
                            <details>
                                <summary>Drop down</summary>
                                <ul className="p-2">
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </details>
                        </li>
                        <li><a>Candidates</a></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn text-xl">Log in</a>
                </div>
            </div>
        </>
    )
}