import React from 'react';
import { Search, MapPin, CloudSun, Cloud, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { NavLink, Link } from 'react-router-dom';

import SearchAutocomplete from './SearchAutocomplete';
import useIntroAnimation from '../hooks/useIntroAnimation';

export default function Navbar() {
  const isFirstLoad = useIntroAnimation();

  const containerVariants = {
    hidden: isFirstLoad ? { opacity: 0, y: -40 } : { opacity: 1, y: 0 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7, 
        delay: isFirstLoad ? 0.15 : 0, 
        ease: "easeOut",
        staggerChildren: isFirstLoad ? 0.06 : 0,
        delayChildren: isFirstLoad ? 0.2 : 0
      } 
    }
  };

  const itemVariants = {
    hidden: isFirstLoad ? { opacity: 0, y: -10 } : { opacity: 1, y: 0 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <motion.nav 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full h-[80px] flex items-center justify-center px-6 md:px-10 z-50 relative shrink-0"
    >
      <div className="w-full max-w-[1440px] flex items-center justify-between">
        
        {/* Logo / Brand */}
        <motion.div variants={itemVariants}>
          <Link to="/" className="flex items-center gap-2 group cursor-pointer pointer-events-auto">
            <div className="w-[36px] h-[36px] rounded-full bg-gradient-to-br from-[#FF8A3D] to-[#E66A17] flex items-center justify-center shadow-[0_0_15px_rgba(255,138,61,0.3)] group-hover:scale-105 transition-transform relative">
              <Cloud size={18} className="text-white/90 translate-x-[2px] -translate-y-[2px]" />
            </div>
            <span className="font-logo font-[800] text-[28px] tracking-wide drop-shadow-sm text-white">Skyora</span>
          </Link>
        </motion.div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-[32px] ml-12">
          {[
            { name: 'Home', path: '/' },
            { name: 'Today', path: '/today' },
            { name: 'Tomorrow', path: '/tomorrow' },
            { name: '10 Days', path: '/10-days' },
            { name: 'Radar', path: '/radar' }
          ].map((item) => (
            <motion.div key={item.name} variants={itemVariants}>
              <NavLink 
                to={item.path} 
                className={({ isActive }) => 
                  `text-[14px] font-medium transition-all duration-200 hover:-translate-y-[2px] hover:text-white drop-shadow-sm hover:drop-shadow-md ${isActive ? 'text-white' : 'text-white/70'}`
                }
              >
                {item.name}
              </NavLink>
            </motion.div>
          ))}
        </div>

        <motion.div variants={itemVariants} className="hidden md:flex items-center gap-6 ml-auto">
          <SearchAutocomplete />
        </motion.div>

        {/* Mobile Menu Icon */}
        <button className="md:hidden flex flex-col gap-1.5 p-2 rounded-md hover:bg-white/10 transition-colors">
          <div className="w-5 h-px bg-white"></div>
          <div className="w-5 h-px bg-white"></div>
        </button>

      </div>
    </motion.nav>
  );
}
