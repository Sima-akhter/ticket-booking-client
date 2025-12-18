import React from 'react'

import { Outlet } from 'react-router'
import Navbar from '../Pages/Shard/Navbar/Navbar'
import Footer from '../Pages/Shard/Fotter/Footer'

const AuthLayout = () => {
  return (
    <div className='max-w-7xl mx-auto'>
        
        <div>
            <Navbar></Navbar>
            <div className='mt-20'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    </div>
  )
}

export default AuthLayout