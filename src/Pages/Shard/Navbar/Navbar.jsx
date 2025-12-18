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
      .then(() => {
        toast.success("You have logged out successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-white font-bold text-lg border-b-4 border-white pb-2 transition-all"
              : "text-white font-semibold text-lg hover:text-purple-200 transition-colors"
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
              className={({ isActive }) =>
                isActive
                  ? "text-white font-bold text-lg border-b-4 border-white pb-2 transition-all"
                  : "text-white font-semibold text-lg hover:text-purple-200 transition-colors"
              }
            >
              All Tickets
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "text-white font-bold text-lg border-b-4 border-white pb-2 transition-all"
                  : "text-white font-semibold text-lg hover:text-purple-200 transition-colors"
              }
            >
              Dashboard
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-gradient-to-r from-purple-700 via-purple-600 to-pink-600 shadow-2xl fixed top-0 left-0 right-0 z-50 px-4 lg:px-16 py-4">
      {/* Logo Section */}
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
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-purple-800 rounded-box mt-4 w-56 p-4 shadow-xl z-50 border border-purple-500">
            {navLinks}
          </ul>
        </div>

        <Link to="/" className="flex items-center gap-3">
          <Logo />
          
        </Link>
      </div>

      
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-10">
          {navLinks}
        </ul>
      </div>

      
      <div className="navbar-end gap-4 items-center">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar ring-4 ring-white ring-opacity-40 hover:ring-opacity-80 transition-all"
            >
              <div className="w-12 rounded-full overflow-hidden border-2 border-white">
                <img
                  alt="User Profile"
                  src={user?.photoURL || userimg}
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <ul tabIndex={0} className="mt-4 p-4 shadow-xl menu menu-sm dropdown-content bg-purple-800 rounded-xl w-60 border border-purple-500 text-white">
              <li className="text-center py-3 border-b border-purple-600">
                <span className="font-bold text-lg">
                  {user?.displayName || "User"}
                </span>
              </li>
              <li className="pt-3">
                <NavLink
                  to="/myProfile"
                  className="font-medium hover:text-purple-200 hover:bg-purple-700 rounded-lg"
                >
                  My Profile
                </NavLink>
              </li>
              <li>
                <button
                  onClick={handleLogOut}
                  className="text-red-300 font-bold hover:bg-red-900 rounded-lg py-3 transition-colors"
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
              className="btn bg-white text-purple-700 font-bold px-8 py-3 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="btn bg-white text-purple-700 font-bold px-8 py-3 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 hidden md:inline-flex"
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