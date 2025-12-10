// import React from 'react'

// import { Link, NavLink } from 'react-router'
// import Logo from '../../../components/Logo/Logo'
// // import useAuth from '../../../Hooks/UseAuth'

// const Navbar = () => {
// //   const {user, logOut} = useAuth();
// //   const handleLogOut = () =>{
// //     logOut()
// //     .then()
// //     .catch(error =>{
// //       console.log(error)
// //     })
// //   }

//   const links = <>
//     <li className='font-bold'><NavLink to="" >Home</NavLink></li>
//     <li className='font-bold'><NavLink to="">All Tickets</NavLink></li>

//     {/* <li><NavLink to="/send-parcel">Send Parcel</NavLink></li>
//     <li><NavLink to="/raider">Be a Rider</NavLink></li>
//     <li><NavLink to="/coverage">Coverage</NavLink></li> */}

//     {/* {
//       user && <>
//       <li><NavLink to="/dashboard/my-parcels">My Parcels</NavLink></li>
//       </>
//     } */}

//   </>
//   return (
//     <div>

//       <div className="navbar bg-base-100 shadow-sm">
//         <div className="navbar-start">
//           <div className="dropdown">
//             <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
//             </div>
//             <ul
//               tabIndex="-1"
//               className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
//               {links}
//             </ul>
//           </div>
//           <span className="btn btn-ghost text-xl">
//             <Logo></Logo>
//           </span>
//         </div>
//         <div className="navbar-center hidden lg:flex">
//           <ul className="menu menu-horizontal px-1">
//             {links}
//           </ul>
//         </div>
//         <div className="navbar-end">
//           {/* {
//             user ? <a onClick={handleLogOut} className="btn">Log Out</a> : <Link className='btn' to="/login">Log in</Link>
//           } */}

//           <Link className='btn btn-primary text-black mx-4' to="/rider">Be a Rider</Link>
//         </div>
//       </div>


//     </div>
//   )
// }

// export default Navbar








// import { useContext } from "react";
import { Link, NavLink } from "react-router";
import Logo from "../../../components/Logo/Logo";
// import { toast } from "react-toastify";
// import userimg from "../assets/user.png";
// import foodlogo from "../assets/img.png";
// import { AuthContext } from "../AuthContexts/AuthProvider";

const Navbar = () => {
//   const { user, logOut } = useContext(AuthContext);

//   const handleLogout = () => {
//     logOut()
//       .then(() => {
//         toast.success("You have logged out successfully");
//       })
//       .catch((error) => {
//          toast.error(error.message);
//       });
//   };

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

      <li>
        <NavLink
          to="/allreviews"
          className={({ isActive }) =>
            isActive
              ? "text-purple-600 border-b-2 border-purple-600 text-lg font-semibold"
              : "text-gray-600 text-lg font-semibold hover:text-purple-600"
          }
        >
          All Reviews
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/recipes"
          className={({ isActive }) =>
            isActive
              ? "text-purple-600 border-b-2 border-purple-600 text-lg font-semibold"
              : "text-gray-600 text-lg font-semibold hover:text-purple-600"
          }
        >
          Recipes
        </NavLink>
      </li>
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
      {/* <div className="navbar-end gap-3">
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
                <NavLink to="/addReview">Add Review</NavLink>
              </li>
              <li>
                <NavLink to="/myreview">My Reviews</NavLink>
              </li>
              <li>
                <NavLink to="/myFavourites">My Favourites</NavLink>
              </li>

              <li>
                <button
                  onClick={handleLogout}
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
              to="/auth/login"
              className="btn bg-green-800 hover:bg-green-600 text-white px-2 lg:px-6"
            >
              Login
            </Link>

            <Link
              to="/auth/register"
              className="btn bg-green-800 hover:bg-green-600 text-white px-2 lg:px-6"
            >
              Register
            </Link>
          </>
        )}
      </div> */}
      

      <button className="btn btn-primary text-black">login</button>
      <button className="btn btn-primary text-black">Register</button>

    </div>
  );
};

export default Navbar;