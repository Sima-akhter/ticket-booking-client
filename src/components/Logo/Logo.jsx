

import React from 'react';
import { Link } from 'react-router';
import { FaCar } from "react-icons/fa6";
import { motion } from "framer-motion";

const Logo = () => {
  return (
    <Link to='/'>
      <motion.div 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className='flex items-center gap-2 group'
      >
        {/* Icon with Primary Blue Color */}
        <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary transition-colors duration-300">
          <FaCar className='text-2xl text-primary group-hover:text-white transition-colors duration-300' />
        </div>

        {/* Dynamic Text for Light/Dark Mode */}
        <span className="text-2xl font-black tracking-tighter text-base-content uppercase italic">
          Ticket<span className="text-primary">Bari</span>
        </span>
      </motion.div>
    </Link>
  );
};

export default Logo;