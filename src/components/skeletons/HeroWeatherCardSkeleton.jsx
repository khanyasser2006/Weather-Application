import React from 'react';
import { motion } from 'framer-motion';
import useIntroAnimation from '../../hooks/useIntroAnimation';

export default function HeroWeatherCardSkeleton() {
  const isFirstLoad = useIntroAnimation();

  return (
    <motion.div
      key="hero-skeleton"
      initial={isFirstLoad ? { opacity: 0, x: 40, scale: 0.96 } : { opacity: 1, x: 0, scale: 1 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      transition={{ duration: 0.7, delay: isFirstLoad ? 0.6 : 0, ease: "easeOut" }}
      className="w-full max-w-[500px] h-auto min-h-[380px] rounded-[24px] relative overflow-hidden bg-[rgba(8,12,22,0.82)] border border-[rgba(255,255,255,0.06)] shadow-[0_30px_80px_rgba(0,0,0,0.40)] flex flex-col p-[36px] backdrop-blur-[30px]"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(255,255,255,0.08)] to-transparent z-0 pointer-events-none" />

      {/* Top Section */}
      <div className="flex items-center justify-between w-full relative z-10 pb-8 mb-6 border-b border-[rgba(255,255,255,0.06)]">
        <div className="flex-1 flex justify-start">
          <div className="w-[90px] h-[90px] rounded-full bg-white/10 animate-pulse" />
        </div>
        <div className="flex-1 flex flex-col items-end pr-2 gap-2">
          <div className="w-[120px] h-[72px] rounded-lg bg-white/10 animate-pulse" />
          <div className="w-[100px] h-[20px] rounded-md bg-white/10 animate-pulse mt-1" />
          <div className="w-[140px] h-[24px] rounded-md bg-white/10 animate-pulse mt-2" />
        </div>
      </div>

      {/* Middle Section */}
      <div className="flex items-center justify-between w-full mt-auto mb-8 relative z-10 px-2">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div className="w-[20px] h-[20px] rounded-full bg-white/10 animate-pulse" />
            <div className="w-[40px] h-[12px] rounded-md bg-white/10 animate-pulse" />
            <div className="w-[30px] h-[16px] rounded-md bg-white/10 animate-pulse" />
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="flex justify-center w-full relative z-10 mt-2">
        <div className="w-[220px] h-[48px] rounded-full bg-[rgba(255,255,255,0.06)] animate-pulse" />
      </div>
    </motion.div>
  );
}
