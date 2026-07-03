import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnalyticsCardWrapper from './AnalyticsCardWrapper';
import useWeatherStore from '../store/useWeatherStore';
import PrecipitationSkeleton from './skeletons/PrecipitationSkeleton';

export default function PrecipitationCard() {
  const weatherData = useWeatherStore(state => state.weatherData);
  const isLoading = useWeatherStore(state => state.isLoading);
  
  return (
    <AnimatePresence mode="wait">
      {isLoading || !weatherData ? (
        <PrecipitationSkeleton key="skeleton" />
      ) : (
        <Content key="content" weatherData={weatherData} />
      )}
    </AnimatePresence>
  );
}

function Content({ weatherData }) {
  const now = new Date();
  const startIndex = weatherData.hourly.findIndex(h => new Date(h.time) >= now);
  const actualStartIndex = startIndex !== -1 ? startIndex : 0;

  // Take next 6 hours jumping by 2 hours
  const precipData = [];
  for (let i = 0; i < 6; i++) {
    const dataIndex = actualStartIndex + (i * 2);
    if (dataIndex < weatherData.hourly.length) {
      const hData = weatherData.hourly[dataIndex];
      const d = new Date(hData.time);
      const timeStr = i === 0 ? 'Now' : d.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }).replace(' ', '');
      const chance = hData.precipitationProbability || 0;
      precipData.push({
        time: timeStr,
        chance: `${chance}%`,
        height: `${Math.max(5, chance)}%` // ensure at least a small bar is visible
      });
    }
  }

  return (
    <motion.div
      key="content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      transition={{ duration: 0.3 }}
      className="w-full h-full"
    >
      <AnalyticsCardWrapper className="flex flex-col px-8 py-6">
        
        {/* Header */}
        <div className="flex items-center gap-2 mb-6 shrink-0 relative z-10">
          <h3 className="text-[14px] font-[700] uppercase text-white tracking-[0.1em] drop-shadow-sm">
            Precipitation
          </h3>
        </div>

        {/* Chart */}
        <div className="flex-1 flex items-end justify-between px-2 pt-2 pb-2 relative z-10">
          {precipData.map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-4 h-full justify-end">
              <span className="text-[13px] font-[700] text-[#4EA2FF] drop-shadow-md">{item.chance}</span>
              <div className="w-[18px] md:w-[22px] bg-[rgba(255,255,255,0.04)] rounded-full h-[140px] relative overflow-hidden flex items-end shadow-[inset_0_4px_8px_rgba(0,0,0,0.5)] border border-[rgba(255,255,255,0.02)]">
                <div 
                  className="w-full rounded-full relative shadow-[inset_0_2px_4px_rgba(255,255,255,0.6),inset_0_-4px_8px_rgba(0,0,0,0.4)]" 
                  style={{ 
                    height: item.height,
                    background: 'linear-gradient(180deg, #4EA2FF 0%, #2E74FF 100%)'
                  }}
                >
                  {/* Glossy Top Highlight */}
                  <div className="absolute top-[2px] left-[2px] right-[2px] h-[6px] bg-white/40 rounded-full blur-[1px]" />
                </div>
              </div>
              <span className="text-[13px] font-[500] text-[#A7B2C7]">{item.time}</span>
            </div>
          ))}
        </div>

      </AnalyticsCardWrapper>
    </motion.div>
  );
}
