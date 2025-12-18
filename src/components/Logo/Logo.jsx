import React from 'react'
import logo from '../../assets/ticketLogo.png'
import { Link } from 'react-router'

const Logo = () => {
  return (
    <Link to='/'>
    <div className='flex items-center gap-2'>
        <img className='w-[70px] rounded-full' src={logo} alt="" />
        <span className="text-3xl font-extrabold text-white tracking-wide">
                    TicketBari
                  </span>
    </div>
    </Link>
  )
}

export default Logo