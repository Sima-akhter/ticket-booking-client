
import { Link, NavLink } from "react-router";
import Logo from "../../../components/Logo/Logo";
import useAuth from "../../../hooks/useAuth";
import userimg from '../../../assets/user.png'
import { toast } from "react-toastify";

const Navbar = () => {
  const {user, logOut} = useAuth();

  const handleLogOut = () => {
    logOut()
      .then(() => {

        toast.success("You have logged out successfully");
      })
      .catch((error) => {
        console.log(error)
         toast.error(error.message);
      });
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-purple-600 border-b-2 border-purple-600 text-lg font-semibold"
              : "text-gray-600 text-lg font-semibold hover:text-purple-600"
          }
        >
          Home
        </NavLink>
      </li>

      

     


     {
        user && <>
       
        <li>
        <NavLink
          to="/allTickets"
          className={({ isActive }) =>
            isActive
              ? "text-purple-600 border-b-2 border-purple-600 text-lg font-semibold"
              : "text-gray-600 text-lg font-semibold hover:text-purple-600"
          }
        >
          All Tickets
        </NavLink>
      </li>

       <li>
        <NavLink
          to="Dashboard"
          className={({ isActive }) =>
            isActive
              ? "text-purple-600 border-b-2 border-purple-600 text-lg font-semibold"
              : "text-gray-600 text-lg font-semibold hover:text-purple-600"
          }
        >
          Dashboard
        </NavLink>
      </li>
        
        </>
     }


    </>
  );

  return (
    <div className="navbar bg-gray-200 shadow-sm px-2 lg:px-5">
      {/* Logo */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-4"
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>

        <Link to="/" className="flex items-center gap-2 font-bold">

          <Logo></Logo>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 flex gap-4">{links}</ul>
      </div>

      {/* User / Login buttons */}
      <div className="navbar-end gap-3">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-12 rounded-full ">
                 {user && <img referrerPolicy="no-referrer" className='w-12 rounded-full ' src={user?.photoURL ? user?.photoURL : userimg} alt="" />}
                
              </div>
            </div>

            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-32"
            >
              <li className="text-center font-semibold">
                {user?.displayName}
              </li>
              <div className="divider my-1"></div>

              
              <li>
                <NavLink to="/myProfile">My Profile</NavLink>
              </li>
               <Link
              to="/login"
              className="btn bg-primary text-black px-2 lg:px-6"
            >
              Login
            </Link>

              <li>
                <button
                  onClick={handleLogOut}
                  className="text-red-600 font-semibold hover:text-red-700"
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
              className="btn bg-primary text-black px-2 lg:px-6"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="btn bg-primary  text-black px-2 lg:px-6"
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