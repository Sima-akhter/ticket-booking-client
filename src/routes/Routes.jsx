import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import AddTicket from "../Pages/Dashboard/AddTicket/AddTicket";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
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
          path: 'addTicket',
          element: <AddTicket></AddTicket>
       }

        ]

    },


]);