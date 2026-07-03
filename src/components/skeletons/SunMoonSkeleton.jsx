import React from 'react';
import AnalyticsSkeletonWrapper from './AnalyticsSkeletonWrapper';

export default function SunMoonSkeleton() {
  return (
    <AnalyticsSkeletonWrapper className="flex flex-col px-6 py-6">
      
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 shrink-0 relative z-10">
        <h3 className="text-[14px] font-[700] uppercase text-white tracking-[0.1em] drop-shadow-sm">
          Astronomy
        </h3>
      </div>

      <div className="flex-1 flex flex-col justify-between relative z-10 gap-4">
        
        {/* Sun Data Grid */}
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col bg-white/[0.02] border border-[rgba(255,255,255,0.04)] rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-[14px] h-[14px] rounded-full bg-white/10 animate-pulse" />
                <div className="w-[60px] h-[12px] rounded bg-white/10 animate-pulse" />
              </div>
              <div className="w-[80px] h-[16px] rounded bg-white/10 animate-pulse mt-1" />
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[rgba(255,255,255,0.08)] my-1" />

        {/* Moon Phase */}
        <div className="flex items-center justify-between bg-white/[0.02] border border-[rgba(255,255,255,0.04)] rounded-xl p-4">
          <div className="flex items-center gap-4">
            <div className="relative w-[40px] h-[40px] flex items-center justify-center">
              <div className="w-[28px] h-[28px] rounded-full bg-white/10 animate-pulse" />
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="w-[70px] h-[12px] rounded bg-white/10 animate-pulse" />
              <div className="w-[90px] h-[16px] rounded bg-white/10 animate-pulse" />
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-1.5">
            <div className="w-[80px] h-[12px] rounded bg-white/10 animate-pulse" />
            <div className="flex items-center gap-1.5">
              <div className="w-[14px] h-[14px] rounded-full bg-white/10 animate-pulse" />
              <div className="w-[40px] h-[16px] rounded bg-white/10 animate-pulse" />
            </div>
          </div>
        </div>

      </div>
    </AnalyticsSkeletonWrapper>
  );
}
