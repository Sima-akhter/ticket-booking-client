import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layouts/DashboardLayout";
import TicketDetails from "../Pages/TicketDetails/TicketDetails";
import VendorRoute from "./VendorRoute";
import VendorProfile from "../Pages/Dashboard/Vendor/VendorProfile";
import MyAddedTickets from "../Pages/Dashboard/Vendor/MyAddTickets";
import AddTicket from "../Pages/Dashboard/Vendor/AddTicket";
import RequestedBookings from "../Pages/Dashboard/Vendor/RequestedBookings";
import RevenueOverview from "../Pages/Dashboard/Vendor/RevenueOverview";
import UserProfile from "../Pages/Dashboard/user/UserProfile";
import MyBookedTickets from "../Pages/Dashboard/user/MyBookedTickets";
import TransactionHistory from "../Pages/Dashboard/user/TransactionHistory";
import AllTickets from "../Pages/AllTickets";
import MyProfile from "../Pages/MyProfile/MyProfile";
import AdminProfile from "../Pages/Dashboard/Admin/AdminProfile";
import AdvertiseTickets from "../Pages/Dashboard/Admin/AdvertiseTickets";
import ManageTickets from "../Pages/Dashboard/Admin/ManageTickets";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import AdminRoute from "./AdminRoute";
import Booking from "../Pages/Dashboard/Booking/Booking";
import BookingSuccess from "../Pages/Dashboard/Booking/BookingSuccess";
import BookingCancelled from "../Pages/Dashboard/Booking/BookingCancelled";
import ContactUs from "../Pages/ContactUs/ContactUs";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            {
                index: true,
                element: <Home></Home>,
            },
            {
                path: '/ticketDetail/:id',
                element: <PrivateRoute>
                    <TicketDetails></TicketDetails>
                </PrivateRoute>
            },

            {
                path: 'myProfile',
                element: <PrivateRoute><MyProfile></MyProfile></PrivateRoute>
            },
            {
                path: 'contactUs',
                element: <ContactUs></ContactUs>
            }

        ]
    },

    {
        path: '/',
        element: <AuthLayout></AuthLayout>,
        children: [
            {
                path: 'login',
                element: <Login></Login>
            },

            {
                path: 'register',
                element: <Register></Register>
            },


            {

                path: 'allTickets',

                element: <PrivateRoute><AllTickets></AllTickets></PrivateRoute>

            },

        ]

    },

    {
        path: 'dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [

            {
                path: "userProfile",
                element: <UserProfile />
            },
            {
                path: "myBookedTickets",
                element: <MyBookedTickets />
            },

            {
                path: "transactions",
                element: <TransactionHistory />
            },
            {
                path: 'booking/:ticketsId',
                element: <Booking></Booking>

            },
            {
                path: 'bookingSuccess',
                element: <BookingSuccess></BookingSuccess>
            },
            {
                path: 'bookingCancelled',
                element: <BookingCancelled></BookingCancelled>
            },



            // only vendor route
            {
                path: 'vendorProfile',
                element: <VendorRoute><VendorProfile></VendorProfile></VendorRoute>
            },

            {
                path: 'addTickets',
                element: <VendorRoute> <AddTicket></AddTicket></VendorRoute>
            },
            {
                path: 'myAddTickets',
                element: <VendorRoute><MyAddedTickets></MyAddedTickets></VendorRoute>


            },
            {
                path: 'requestedBookings',
                element: <VendorRoute><RequestedBookings></RequestedBookings></VendorRoute>


            },
            {
                path: 'revenueOverview',
                element: <VendorRoute><RevenueOverview></RevenueOverview></VendorRoute>


            },

            //only admin route
            {
                path: 'adnimProfile',
                element: <AdminRoute><AdminProfile></AdminProfile></AdminRoute>
            },

            {
                path: 'advertiseTickets',
                element: <AdminRoute><AdvertiseTickets></AdvertiseTickets></AdminRoute>
            },
            {
                path: 'manageTickets',
                element: <AdminRoute><ManageTickets></ManageTickets></AdminRoute>
            },
            {
                path: 'manageUsers',
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            }




        ]
    }


]);