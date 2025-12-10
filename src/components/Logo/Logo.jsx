import React from 'react'
import logo from '../../assets/cmbLogo.png'
import { Link } from 'react-router'

const Logo = () => {
  return (
    <Link to='/'>
    <div className='flex items-center'>
        <img className='w-[100px] rounded-full' src={logo} alt="" />
        <h1 className='text-2xl font-bold'>TicketBari</h1>
    </div>
    </Link>
  )
}

export default Logo