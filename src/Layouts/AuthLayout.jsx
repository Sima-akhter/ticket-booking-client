import React from 'react'

import { Outlet } from 'react-router'
import Navbar from '../Pages/Shard/Navbar/Navbar'
import Footer from '../Pages/Shard/Fotter/Footer'

const AuthLayout = () => {
  return (
    <div>
        
        <div className='max-w-7xl mx-auto'>
            <Navbar></Navbar>
            <div className='mt-20'>
                <Outlet></Outlet>
            </div>
            
        </div>
        <div className='w-full'>
                <Footer></Footer>
            </div>
    </div>
    
  )
}

export default AuthLayout