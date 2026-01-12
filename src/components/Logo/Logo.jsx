import React from 'react'

import { Link } from 'react-router'
import { FaCar } from "react-icons/fa6";

const Logo = () => {
  return (
    <Link to='/'>
    <div className='flex items-center gap-2'>
        
        <FaCar className='text-3xl text-blue-600'/>
        <span className="text-2xl font-extrabold  tracking-wide">
                    TicketBari
                  </span>
    </div>
    </Link>
  )
}

export default Logo