import React, { useEffect, useState } from 'react';
import { 
  FaBullhorn, FaChartBar, FaClipboardList, FaMoneyCheckAlt, 
  FaPlusCircle, FaTicketAlt, FaUser, FaUsersCog, 
  FaUserShield, FaUserTie, FaHome, FaSun, FaMoon 
} from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router';
import useRole from '../hooks/useRole';

const DashboardLayout = () => {
  const [roleData, isLoading] = useRole();
  
  // Theme State
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Toggle Theme Function
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Apply theme to document
  useEffect(() => {
    document.querySelector('html').setAttribute('data-theme', theme);
  }, [theme]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-100">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const role = roleData?.role;

  const activeLink = "flex items-center gap-3 px-4 py-3 rounded-xl bg-primary text-primary-content shadow-lg shadow-primary/20 transition-all duration-300";
  const normalLink = "flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-base-300 text-base-content/80 hover:text-primary transition-all duration-300";

  return (
    <div className="bg-base-100 min-h-screen transition-colors duration-300">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        
        <div className="drawer-content flex flex-col">
          {/* --- Navbar --- */}
          <nav className="navbar w-full bg-base-100 border-b border-base-300 sticky top-0 z-10 backdrop-blur-md bg-opacity-80 px-4 md:px-8">
            <div className="flex-none lg:hidden">
              <label htmlFor="my-drawer-4" className="btn btn-square btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
              </label>
            </div>
            
            <div className="flex-1">
              <span className="text-xl font-black italic tracking-tighter uppercase hidden md:block">
                Ticket<span className="text-primary">Bari</span> Dashboard
              </span>
            </div>

            {/* --- Theme Controller Button --- */}
            <div className="flex-none">
              <button 
                onClick={toggleTheme}
                className="btn btn-ghost btn-circle text-xl transition-all duration-500 hover:rotate-12"
              >
                {theme === "light" ? <FaMoon className="text-slate-700" /> : <FaSun className="text-yellow-400" />}
              </button>
            </div>
          </nav>

          {/* Page content here */}
          <main className="p-6 bg-base-200/50 min-h-full">
            <Outlet />
          </main>
        </div>

        {/* Sidebar */}
        <div className="drawer-side z-20">
          <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
          <div className="w-72 min-h-full bg-base-100 border-r border-base-300 flex flex-col p-4">
            
            <div className="px-4 py-6">
               <h1 className="text-2xl font-black italic text-primary uppercase">Dashboard</h1>
            </div>

            <ul className="menu space-y-2">
              <li>
                <NavLink to="/" className={({ isActive }) => isActive ? activeLink : normalLink}>
                  <FaHome className="text-lg" /> <span>Back to Home</span>
                </NavLink>
              </li>

              <div className="divider opacity-50 uppercase text-[10px] font-bold tracking-widest">Menu</div>

              {/* User Links */}
              {role === 'user' && (
                <>
                  <li><NavLink to="/dashboard/userProfile" className={({ isActive }) => isActive ? activeLink : normalLink}><FaUser /> <span>User Profile</span></NavLink></li>
                  <li><NavLink to="/dashboard/myBookedTickets" className={({ isActive }) => isActive ? activeLink : normalLink}><FaTicketAlt /> <span>My Bookings</span></NavLink></li>
                  <li><NavLink to="/dashboard/transactions" className={({ isActive }) => isActive ? activeLink : normalLink}><FaMoneyCheckAlt /> <span>Transactions</span></NavLink></li>
                </>
              )}

              {/* Vendor Links */}
              {role === 'vendor' && (
                <>
                  <li><NavLink to="/dashboard/vendorProfile" className={({ isActive }) => isActive ? activeLink : normalLink}><FaUserTie /> <span>Vendor Profile</span></NavLink></li>
                  <li><NavLink to="/dashboard/addTickets" className={({ isActive }) => isActive ? activeLink : normalLink}><FaPlusCircle /> <span>Add Ticket</span></NavLink></li>
                  <li><NavLink to="/dashboard/myAddTickets" className={({ isActive }) => isActive ? activeLink : normalLink}><FaTicketAlt /> <span>My Tickets</span></NavLink></li>
                  <li><NavLink to="/dashboard/requestedBookings" className={({ isActive }) => isActive ? activeLink : normalLink}><FaClipboardList /> <span>Requested</span></NavLink></li>
                  <li><NavLink to="/dashboard/revenueOverview" className={({ isActive }) => isActive ? activeLink : normalLink}><FaChartBar /> <span>Revenue</span></NavLink></li>
                </>
              )}

              {/* Admin Links */}
              {role === 'admin' && (
                <>
                  <li><NavLink to="/dashboard/adminProfile" className={({ isActive }) => isActive ? activeLink : normalLink}><FaUserShield /> <span>Admin Profile</span></NavLink></li>
                  <li><NavLink to="/dashboard/advertiseTickets" className={({ isActive }) => isActive ? activeLink : normalLink}><FaBullhorn /> <span>Advertise</span></NavLink></li>
                  <li><NavLink to="/dashboard/manageTickets" className={({ isActive }) => isActive ? activeLink : normalLink}><FaTicketAlt /> <span>Manage Tickets</span></NavLink></li>
                  <li><NavLink to="/dashboard/manageUsers" className={({ isActive }) => isActive ? activeLink : normalLink}><FaUsersCog /> <span>Manage Users</span></NavLink></li>
                </>
              )}
            </ul>

            <div className="mt-auto p-4 bg-base-200 rounded-2xl border border-base-300">
               <p className="text-[10px] font-bold text-base-content/40 uppercase text-center">TicketBari v2.0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;