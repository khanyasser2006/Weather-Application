import React from 'react';
import { motion } from 'framer-motion';

export default function HourlyForecastSkeleton() {
  return (
    <motion.div
      key="hourly-skeleton"
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      className="w-full h-[250px] md:h-[280px] rounded-[24px] bg-[rgba(10,15,25,0.55)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.04)] border-t-[rgba(255,138,61,0.25)] flex flex-col overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.25)] relative"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,138,61,0.15),transparent_60%)] pointer-events-none z-0" />
      
      {/* Header */}
      <div className="flex justify-between items-center w-full px-8 py-6 border-b border-[rgba(255,255,255,0.05)] shrink-0 relative z-10">
        <h3 className="text-[14px] font-[700] tracking-[0.08em] uppercase text-[#FF8A3D] drop-shadow-sm">
          Hourly Forecast
        </h3>
      </div>

      {/* Forecast Items Container */}
      <div className="flex-1 overflow-hidden flex items-stretch py-6 relative z-10">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="flex relative shrink-0 min-w-[96px] sm:min-w-[100px] lg:flex-1">
            {index > 0 && (
              <div className="absolute left-0 top-3 bottom-3 w-px bg-[rgba(255,255,255,0.06)]" />
            )}
            <div className="flex flex-col items-center justify-center gap-3 md:gap-4 w-full h-full relative">
              <div className="w-[30px] h-[12px] rounded bg-white/10 animate-pulse" />
              <div className="w-[26px] h-[26px] rounded-full bg-white/10 animate-pulse" />
              <div className="w-[36px] h-[20px] rounded bg-white/10 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
