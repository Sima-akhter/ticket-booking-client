import React from 'react'
import logo from '../../assets/cmbLogo.png'
import { Link } from 'react-router'

const Logo = () => {
  return (
    <Link to='/'>
    <div className='flex items-center'>
        <img className='w-[100px] rounded-full' src={logo} alt="" />
        <span className="text-3xl font-extrabold text-white tracking-wide">
                    TicketBari
                  </span>
    </div>
    </Link>
  )
}

export default Logo