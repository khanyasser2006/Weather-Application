import React from 'react';
import AnalyticsSkeletonWrapper from './AnalyticsSkeletonWrapper';

export default function WindStatusSkeleton() {
  return (
    <AnalyticsSkeletonWrapper className="flex flex-col px-8 py-6">
      
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 shrink-0 relative z-10">
        <h3 className="text-[14px] font-[700] uppercase text-white tracking-[0.1em] drop-shadow-sm">
          Wind Status
        </h3>
      </div>

      {/* Compass Skeleton */}
      <div className="flex-1 flex flex-col items-center justify-center mt-2 relative z-10">
        <div className="relative w-[160px] h-[160px] flex items-center justify-center">
          {/* Compass Rings */}
          <div className="absolute inset-0 rounded-full border border-white/10 animate-pulse" />
          <div className="absolute inset-[10px] rounded-full border border-[rgba(255,255,255,0.05)] border-dashed animate-pulse" />
          <div className="absolute inset-[20px] rounded-full border border-[rgba(255,255,255,0.02)] animate-pulse" />

          {/* Centered Speed Skeleton */}
          <div className="flex flex-col items-center z-10 gap-2">
            <div className="w-[48px] h-[36px] rounded bg-white/10 animate-pulse" />
            <div className="w-[32px] h-[14px] rounded bg-white/10 animate-pulse" />
          </div>
        </div>

        {/* Direction Label */}
        <div className="mt-6 mb-2">
          <div className="w-[80px] h-[18px] rounded bg-white/10 animate-pulse" />
        </div>
      </div>

    </AnalyticsSkeletonWrapper>
  );
}
