import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
// import AddTicket from "../Pages/Dashboard/AddTicket/AddTicket";
import PrivateRoute from "./PrivateRoute";

import DashboardLayout from "../Layouts/DashboardLayout";
import AllTIcket from "../Pages/Dashboard/MyBookedTickets/MyBookedTickets";
import MyBookedTickets from "../Pages/Dashboard/MyBookedTickets/MyBookedTickets";
import TicketDetails from "../Pages/TicketDetails/TicketDetails";
import VendorRoute from "./VendorRoute";
import VendorProfile from "../Pages/Dashboard/Vendor/VendorProfile";
import MyAddedTickets from "../Pages/Dashboard/Vendor/MyAddTickets";
import AddTicket from "../Pages/Dashboard/Vendor/AddTicket";
import RequestedBookings from "../Pages/Dashboard/Vendor/RequestedBookings";

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
            }
        ]
    },

    {
        path: '/',
        element:<AuthLayout></AuthLayout>,
        children: [
            {
              path: 'login' ,
              element: <Login></Login>
            },

            {
                path: 'register',
                element: <Register></Register>
            },


            {
               
          path: 'allTicket',
        
          element: <PrivateRoute><AllTIcket></AllTIcket></PrivateRoute>
       
            },

         ]

    },

    {
        path:'dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [

            {
                path: 'MyBookedTickets',
                element: <MyBookedTickets></MyBookedTickets>
            },
          

         {
            path: 'vendorProfile',
            element:  <VendorProfile></VendorProfile>
         },

         

         {
            path: 'addTickets',
            element: <AddTicket></AddTicket>
         },
         {
            path: 'myAddTickets',
            element: <MyAddedTickets></MyAddedTickets>
                
            
         },
         {
            path: 'requestedBookings',
            element: <RequestedBookings></RequestedBookings>
                
            
         },

         
        ]
    }


]);