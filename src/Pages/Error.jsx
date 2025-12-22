import React from 'react'
import erroeImg from '../assets/error-404.png'
import { Link } from 'react-router'

const Error = () => {
  return (
    <div>
       <title>Error Pages</title>
      <div>
       <div className='flex justify-center items-center'>
         <img src={erroeImg} alt="" />
       </div>
        <h1 className='text-3xl md:text-5xl text-center font-bold text-violet-500'>404</h1>
        <p className='text-xl md:text-3xl text-center font-bold text-violet-500'>Page not found!</p>
        <p className='text-center text-violet-500'>Sorry, the page you are looking for might be removed, renamed or temporarily unavailable!</p>
        <div className='flex justify-center items-center mt-10'>
            <Link to='/' className='block text-center btn bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 rounded-full shadow-xl hover:shadow-purple-500 transform hover:scale-105 transition-all duration-300'>Back to home</Link>
        </div>
    </div>

    </div>
  )
}

export default Error