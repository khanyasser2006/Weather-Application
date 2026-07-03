import React from 'react';
import AnalyticsSkeletonWrapper from './AnalyticsSkeletonWrapper';

export default function AQISkeleton() {
  return (
    <AnalyticsSkeletonWrapper className="flex flex-col p-[24px] pb-0">
      
      {/* Card Header */}
      <h4 className="text-[14px] font-[700] text-white uppercase tracking-[0.1em] drop-shadow-sm mb-0 shrink-0">Air Quality Index</h4>

      {/* Gauge & Number */}
      <div className="flex-1 flex flex-col items-center justify-center mt-2 mb-2 min-h-0">
        <div className="relative w-[200px] h-[200px] flex items-center justify-center shrink-0">
          
          {/* Circular Gauge Skeleton */}
          <div className="absolute inset-0 rounded-full border-[8px] border-white/10 animate-pulse" />

          {/* Number Centered */}
          <div className="flex flex-col items-center mt-2 gap-3">
            <div className="w-[60px] h-[60px] rounded bg-white/10 animate-pulse" />
            <div className="w-[80px] h-[20px] rounded bg-white/10 animate-pulse" />
          </div>

        </div>
      </div>

      {/* Description */}
      <div className="mt-2 mb-4 text-center px-2 shrink-0 flex flex-col items-center gap-1.5">
        <div className="w-full max-w-[180px] h-[14px] rounded bg-white/10 animate-pulse" />
        <div className="w-full max-w-[140px] h-[14px] rounded bg-white/10 animate-pulse" />
      </div>

      {/* Bottom CTA */}
      <div className="mt-auto pt-3 pb-4 w-full flex justify-center border-t border-[rgba(255,255,255,0.05)] relative z-50 shrink-0">
        <div className="w-[120px] h-[16px] rounded bg-white/10 animate-pulse" />
      </div>

    </AnalyticsSkeletonWrapper>
  );
}
