import React from 'react';
import { motion } from 'framer-motion';

export default function PageShell({ title, subtitle, children }) {
  return (
    <div className="flex flex-col w-full max-w-[1440px] mx-auto px-6 md:px-10 mt-12 pb-24 flex-1">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col w-full"
      >
        <div className="mb-12 max-w-[800px]">
          <h1 className="text-[40px] md:text-[54px] font-[800] text-white tracking-tight drop-shadow-sm mb-4 leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[18px] text-[#A7B2C7] font-medium leading-[1.6]">
              {subtitle}
            </p>
          )}
        </div>

        <div className="bg-[rgba(10,15,25,0.55)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.04)] rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.25)] p-8 md:p-12 font-system font-medium">
          <div className="prose prose-invert max-w-none text-[16px] leading-[1.8] text-[#A7B2C7]">
            {children}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
