import React from 'react'
import { Outlet } from 'react-router'
import Footer from '../Pages/Shard/Fotter/Footer'
import Navbar from '../Pages/Shard/Navbar/Navbar'

const RootLayout = () => {
  return (
    <div >
       <div className='max-w-7xl mx-auto'>
         <Navbar></Navbar>
        <div>
            <Outlet></Outlet>
        </div>
       </div>
        <div>
            <Footer></Footer>
        </div>
    </div>
  )
}


export default RootLayout