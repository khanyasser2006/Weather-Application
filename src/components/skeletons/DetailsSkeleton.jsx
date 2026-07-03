import React from 'react';
import AnalyticsSkeletonWrapper from './AnalyticsSkeletonWrapper';

export default function DetailsSkeleton() {
  return (
    <AnalyticsSkeletonWrapper className="flex flex-col px-8 py-6">
      
      {/* Header */}
      <div className="flex items-center gap-2 mb-6 shrink-0 relative z-10">
        <h3 className="text-[14px] font-[700] uppercase text-white tracking-[0.1em] drop-shadow-sm">
          Details
        </h3>
      </div>

      <div className="flex-1 flex flex-col justify-between relative z-10">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="flex items-center justify-between py-[14px] border-b border-[rgba(255,255,255,0.06)] last:border-0 last:pb-0 first:pt-0">
            <div className="w-[60px] h-[14px] rounded bg-white/10 animate-pulse" />
            <div className="w-[50px] h-[16px] rounded bg-white/10 animate-pulse" />
          </div>
        ))}
      </div>

    </AnalyticsSkeletonWrapper>
  );
}
