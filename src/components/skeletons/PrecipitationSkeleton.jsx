import React from 'react';
import AnalyticsSkeletonWrapper from './AnalyticsSkeletonWrapper';

export default function PrecipitationSkeleton() {
  return (
    <AnalyticsSkeletonWrapper className="flex flex-col px-8 py-6">
      
      {/* Header */}
      <div className="flex items-center gap-2 mb-6 shrink-0 relative z-10">
        <h3 className="text-[14px] font-[700] uppercase text-white tracking-[0.1em] drop-shadow-sm">
          Precipitation
        </h3>
      </div>

      {/* Chart */}
      <div className="flex-1 flex items-end justify-between px-2 pt-2 pb-2 relative z-10">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="flex flex-col items-center gap-4 h-full justify-end">
            <div className="w-[24px] h-[16px] rounded bg-white/10 animate-pulse" />
            <div className="w-[18px] md:w-[22px] bg-[rgba(255,255,255,0.04)] rounded-full h-[140px] relative overflow-hidden flex items-end border border-[rgba(255,255,255,0.02)]">
              <div className="w-full bg-white/10 animate-pulse rounded-full" style={{ height: `${20 + Math.random() * 40}%` }} />
            </div>
            <div className="w-[30px] h-[16px] rounded bg-white/10 animate-pulse" />
          </div>
        ))}
      </div>

    </AnalyticsSkeletonWrapper>
  );
}
