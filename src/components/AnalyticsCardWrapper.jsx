import React from 'react';
import { motion } from 'framer-motion';

export default function AnalyticsCardWrapper({ children, className = '' }) {
  return (
    <motion.div 
      whileHover={{ y: -4, boxShadow: '0 30px 60px rgba(0,0,0,0.40)' }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`relative w-full h-full rounded-[24px] border border-[rgba(255,255,255,0.04)] shadow-[0_20px_50px_rgba(0,0,0,0.25)] overflow-hidden flex flex-col`}
      style={{
        background: 'linear-gradient(180deg, rgba(6,15,30,0.95), rgba(3,10,22,0.95))'
      }}
    >
      {/* Subtle Internal Lighting */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at top left, rgba(255,255,255,0.04), transparent 50%)'
        }}
      />
      
      {/* Content */}
      <div className={`relative z-10 w-full h-full flex flex-col flex-1 ${className}`}>
        {children}
      </div>
    </motion.div>
  );
}

