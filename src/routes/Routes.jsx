import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import AddTicket from "../Pages/Dashboard/AddTicket/AddTicket";
import PrivateRoute from "./PrivateRoute";

import DashboardLayout from "../Layouts/DashboardLayout";
import AllTIcket from "../Pages/Dashboard/MyBookedTickets/MyBookedTickets";
import MyBookedTickets from "../Pages/Dashboard/MyBookedTickets/MyBookedTickets";
import TicketDetails from "../Pages/TicketDetails/TicketDetails";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
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
          path: 'addTicket',
          element: <AddTicket></AddTicket>
         },
        ]
    }


]);