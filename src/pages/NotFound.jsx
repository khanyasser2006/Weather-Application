import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, CloudSun } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col flex-1 w-full max-w-[1440px] mx-auto px-6 md:px-10 justify-center items-center py-20">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center justify-center text-center max-w-[600px] w-full"
      >
        <div className="relative mb-8">
          <CloudSun className="text-[#FF8A3D] drop-shadow-[0_0_12px_rgba(255,138,61,0.8)]" size={120} strokeWidth={1.5} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#FF8A3D]/20 blur-[60px] rounded-full pointer-events-none" />
        </div>

        <h1 className="text-[120px] md:text-[150px] font-[800] leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 mb-4 drop-shadow-sm">
          404
        </h1>
        
        <h2 className="text-[28px] md:text-[36px] font-[700] text-white tracking-tight mb-6">
          Looks like this front has passed.
        </h2>
        
        <p className="text-[16px] md:text-[18px] text-[#A7B2C7] font-[500] leading-[1.6] mb-12 max-w-[480px]">
          The page you are looking for has been swept away by the wind or doesn't exist anymore. Let's get you back to safe weather.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-8 py-4 w-full sm:w-auto bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] rounded-full text-white font-[600] transition-all duration-300 backdrop-blur-md"
          >
            <ArrowLeft size={18} />
            <span>Go Back</span>
          </button>
          
          <Link 
            to="/"
            className="flex items-center justify-center gap-2 px-8 py-4 w-full sm:w-auto bg-gradient-to-r from-[#FF8A3D] to-[#FF6B00] hover:from-[#FF9A5A] hover:to-[#FF7A1A] rounded-full text-white font-[600] transition-all duration-300 shadow-[0_4px_14px_rgba(255,138,61,0.4)]"
          >
            <Home size={18} />
            <span>Return Home</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
