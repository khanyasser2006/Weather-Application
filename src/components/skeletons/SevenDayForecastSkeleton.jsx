import React from 'react';
import AnalyticsSkeletonWrapper from './AnalyticsSkeletonWrapper';

export default function SevenDayForecastSkeleton() {
  return (
    <AnalyticsSkeletonWrapper className="flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center w-full px-6 py-5 border-b border-[rgba(255,255,255,0.05)] shrink-0 relative z-50">
        <h3 className="text-[14px] font-[600] tracking-[0.08em] uppercase text-[rgba(255,255,255,0.9)]">
          7 Day Forecast
        </h3>
      </div>

      {/* Rows */}
      <div className="flex-1 flex flex-col justify-evenly px-8 py-4 overflow-hidden">
        {[...Array(7)].map((_, index) => (
          <div key={index} className="flex items-center justify-between w-full h-[56px]">
            {/* Day & Date */}
            <div className="flex flex-col w-[60px] shrink-0 gap-1.5">
              <div className="w-[40px] h-[14px] rounded bg-white/10 animate-pulse" />
              <div className="w-[30px] h-[12px] rounded bg-white/10 animate-pulse" />
            </div>

            {/* Icon */}
            <div className="w-[48px] flex justify-center shrink-0">
              <div className="w-[24px] h-[24px] rounded-full bg-white/10 animate-pulse" />
            </div>

            {/* High Temp */}
            <div className="w-[40px] flex justify-end shrink-0">
              <div className="w-[20px] h-[16px] rounded bg-white/10 animate-pulse" />
            </div>

            {/* Temperature Bar */}
            <div className="flex-1 mx-6 h-[6px] rounded-full bg-white/10 animate-pulse" />

            {/* Low Temp */}
            <div className="w-[40px] flex justify-start shrink-0">
              <div className="w-[20px] h-[16px] rounded bg-white/10 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </AnalyticsSkeletonWrapper>
  );
}
