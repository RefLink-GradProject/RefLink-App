import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import LoginButtonToggleFront from "./LoginButtonToggleFront";
import { useState } from "react";

export default function Navbar({ userName }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="navbar mb-5 md:mb-10  animate-fade-down">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost md:hidden"
              onClick={toggleDropdown}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 ${
                isOpen ? "block" : "hidden"
              }`}
            >
              <Link to="/"><li>
                  <a onClick={toggleDropdown}>Home</a>
                </li>
              </Link>
              <li>
                <Link to="/postings">
                  <a onClick={toggleDropdown}>Postings</a>
                </Link>
              </li>
              <li>
                <Link to="/dashboard">
                  <a onClick={toggleDropdown}>Dashboard</a>
                </Link>
              </li>
            </ul>
          </div>
          <Link to="/">
            <a className="btn btn-ghost text-lg md:text-2xl lg:text-3xl w-32 md:w-40 lg:w-48">
              <FontAwesomeIcon icon={faLink} size="sm" />
              RefLink
            </a>
          </Link>
        </div>
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal px-1 text-xl">
            <Link to="/">
              <li>
                <a>Home</a>
              </li>
            </Link>
            <li>
              <Link to="/postings">
                <a>Postings</a>
              </Link>
            </li>

            <li>
              <Link to="/dashboard">
                <a>Dashboard</a>
              </Link>
            </li>
          </ul>
        </div>

        <LoginButtonToggleFront userName={userName} />
      </div>
    </>
  );
}

type Props = {
  userName?: string;
};
