import React from 'react'

import { Navigate, useLocation } from 'react-router';
import Loading from '../components/Loading';
import useAuth from '../hooks/useAuth';


const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation();
    console.log('location', location)

   if(loading){
    return <Loading></Loading>
   }

   if(!user){
    return <Navigate state={location.pathname} to="/login"></Navigate>
   }

  return children;
}

export default PrivateRoute