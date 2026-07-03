import React from 'react';
import { motion } from 'framer-motion';

export default function AnalyticsSkeletonWrapper({ children, className = '' }) {
  return (
    <motion.div 
      key="skeleton"
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      className={`relative w-full h-full rounded-[24px] border border-[rgba(255,255,255,0.04)] shadow-[0_20px_50px_rgba(0,0,0,0.25)] overflow-hidden flex flex-col`}
      style={{
        background: 'linear-gradient(180deg, rgba(6,15,30,0.95), rgba(3,10,22,0.95))'
      }}
    >
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at top left, rgba(255,255,255,0.04), transparent 50%)'
        }}
      />
      <div className={`relative z-10 w-full h-full flex flex-col flex-1 ${className}`}>
        {children}
      </div>
    </motion.div>
  );
}
