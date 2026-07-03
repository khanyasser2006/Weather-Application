import React from 'react';
import AnalyticsSkeletonWrapper from './AnalyticsSkeletonWrapper';

export default function WeatherMapSkeleton() {
  return (
    <AnalyticsSkeletonWrapper className="relative flex flex-col p-0 overflow-hidden">
      <h4 className="absolute top-[28px] left-[28px] z-[400] text-[14px] font-[700] text-white uppercase tracking-[0.1em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] bg-black/40 px-3 py-1 rounded-md backdrop-blur-sm">
        Weather Map
      </h4>
      <div className="flex-1 w-full relative z-0 h-full min-h-[300px] bg-white/5 animate-pulse" />
      <div className="absolute inset-0 pointer-events-none rounded-[24px] shadow-[inset_0_0_40px_rgba(4,10,20,0.6)]" />
    </AnalyticsSkeletonWrapper>
  );
}
