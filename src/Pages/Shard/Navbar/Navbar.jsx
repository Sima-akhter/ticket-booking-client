import React, { useEffect, useState, useRef } from 'react';
import { Link, NavLink } from "react-router";
import Logo from "../../../components/Logo/Logo";
import useAuth from "../../../hooks/useAuth";
import userimg from '../../../assets/user.png';
import { toast } from "react-toastify";
import { HiOutlineSun, HiOutlineMoon, HiBars3BottomRight, HiXMark } from "react-icons/hi2";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === "light" ? "dark" : "light");

  const handleLogOut = () => {
    logOut()
      .then(() => toast.success("Logged out successfully"))
      .catch(error => toast.error(error.message));
  };

  const linkStyles = ({ isActive }) =>
    `text-base lg:text-lg font-medium transition-all duration-300 block py-2 lg:py-1 ${
      isActive 
        ? "text-indigo-600 dark:text-indigo-400 border-l-4 lg:border-l-0 lg:border-b-2 border-indigo-600 pl-3 lg:pl-0" 
        : "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
    }`;

  const navLinks = (
    <>
      <NavLink to="/" className={linkStyles} onClick={() => setIsMenuOpen(false)}>Home</NavLink>
      <NavLink to="/allTickets" className={linkStyles} onClick={() => setIsMenuOpen(false)}>Tickets</NavLink>
      <NavLink to="/aboutUs" className={linkStyles} onClick={() => setIsMenuOpen(false)}>About</NavLink>
      <NavLink to="/contactUs" className={linkStyles} onClick={() => setIsMenuOpen(false)}>Contact</NavLink>
      {user && <NavLink to="/dashboard" className={linkStyles} onClick={() => setIsMenuOpen(false)}>Dashboard</NavLink>}
    </>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-[9999] bg-white/80 dark:bg-slate-900/90 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Left: Logo & Mobile Toggle */}
          <div className="flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 mr-2 lg:hidden text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg"
            >
              {isMenuOpen ? <HiXMark className="text-2xl" /> : <HiBars3BottomRight className="text-2xl" />}
            </button>
            <Link to="/" className="flex-shrink-0">
              <Logo />
            </Link>
          </div>

          {/* Center: Desktop Links */}
          <div className="hidden lg:flex space-x-8">
            {navLinks}
          </div>

          {/* Right: Theme & User */}
          <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={toggleTheme} 
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-all"
            >
              {theme === "light" ? <HiOutlineMoon size={24} /> : <HiOutlineSun size={24} className="text-yellow-400" />}
            </button>

            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center focus:outline-none ring-2 ring-indigo-500/20 rounded-full p-0.5"
                >
                  <img className="h-10 w-10 rounded-full object-cover border border-gray-200" src={user?.photoURL || userimg} alt="User" />
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden">
                    <div className="px-4 py-3 bg-gray-50 dark:bg-slate-800/50 border-b border-gray-100 dark:border-slate-700">
                      <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400 truncate">{user?.displayName || "User"}</p>
                      <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    </div>
                    <Link to="/myProfile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-slate-700" onClick={() => setIsProfileOpen(false)}>My Profile</Link>
                    <button onClick={handleLogOut} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 font-medium">Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-3">
                <Link to="/login" className="text-gray-700 dark:text-gray-200 font-medium hover:text-indigo-600">Login</Link>
                <Link to="/register" className="bg-indigo-600 text-white px-6 py-2.5 rounded-full font-semibold shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition-all">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Sidebar */}
      <div className={`lg:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? "max-h-screen opacity-100 py-4" : "max-h-0 opacity-0"}`}>
        <div className="px-4 space-y-2 pb-4 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800">
          {navLinks}
          {!user && (
            <div className="pt-4 flex flex-col gap-3 border-t border-gray-100 dark:border-slate-800">
              <Link to="/login" className="w-full py-2 text-center border border-indigo-600 text-indigo-600 rounded-lg">Login</Link>
              <Link to="/register" className="w-full py-2 text-center bg-indigo-600 text-white rounded-lg">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;