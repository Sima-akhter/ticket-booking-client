import React from 'react'
import { Outlet } from 'react-router'
import Footer from '../Pages/Shard/Fotter/Footer'
import Navbar from '../Pages/Shard/Navbar/Navbar'

const RootLayout = () => {
  return (
    <div className='max-w-7xl mx-auto'>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}

export default RootLayout