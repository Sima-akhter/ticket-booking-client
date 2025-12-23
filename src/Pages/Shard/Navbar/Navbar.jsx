import React from 'react';
import { Link, NavLink } from "react-router";
import Logo from "../../../components/Logo/Logo";
import useAuth from "../../../hooks/useAuth";
import userimg from '../../../assets/user.png';
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut()
      .then(() => toast.success("You have logged out successfully"))
      .catch(error => toast.error(error.message));
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-white font-bold text-lg border-b-2 border-white pb-1"
              : "text-white font-semibold text-lg hover:text-purple-200"
          }
        >
          Home
        </NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink
              to="/allTickets"
              className="text-white font-semibold text-lg hover:text-purple-200"
            >
              All Tickets
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard"
              className="text-white font-semibold text-lg hover:text-purple-200"
            >
              Dashboard
            </NavLink>
          </li>
        </>
      )}

      {/* 🔹 Mobile only Login / Register */}
      {!user && (
        <div className="mt-4 flex flex-col gap-3 lg:hidden">
          <Link
            to="/login"
            className="btn bg-white text-purple-700 font-bold rounded-full"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="btn bg-white text-purple-700 font-bold rounded-full"
          >
            Register
          </Link>
        </div>
      )}
    </>
  );

  return (
    <div className="navbar bg-gradient-to-r from-purple-700 via-purple-600 to-pink-600 fixed top-0 left-0 right-0 z-50 shadow-xl px-4 overflow-x-hidden">
      
      {/* Navbar Start */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-white"
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

          {/* 📱 Mobile Menu */}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 w-56 p-4 bg-purple-800 rounded-xl shadow-xl z-[9999]"
          >
            {navLinks}
          </ul>
        </div>

        <Link to="/" className="flex items-center gap-2">
          <Logo />
        </Link>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-10">
          {navLinks}
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end gap-4">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar ring-2 ring-white"
            >
              <div className="w-11 rounded-full overflow-hidden">
                <img src={user?.photoURL || userimg} alt="user" />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 w-56 p-4 bg-purple-800 rounded-xl shadow-xl text-white z-[9999]"
            >
              <li className="text-center font-bold border-b border-purple-600 pb-2">
                {user?.displayName || "User"}
              </li>
              <li className="mt-2">
                <NavLink to="/myProfile">My Profile</NavLink>
              </li>
              <li>
                <button
                  onClick={handleLogOut}
                  className="text-red-300 font-bold"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <Link
              to="/login"
              className="btn bg-white text-purple-700 font-bold rounded-full px-6 hidden lg:inline-flex"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="btn bg-white text-purple-700 font-bold rounded-full px-6 hidden lg:inline-flex"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
