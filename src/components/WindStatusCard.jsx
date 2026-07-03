import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnalyticsCardWrapper from './AnalyticsCardWrapper';
import { Navigation } from 'lucide-react';
import useWeatherStore from '../store/useWeatherStore';
import { getWindDirection } from '../utils/weatherUtils';
import WindStatusSkeleton from './skeletons/WindStatusSkeleton';

export default function WindStatusCard() {
  const weatherData = useWeatherStore(state => state.weatherData);
  const isLoading = useWeatherStore(state => state.isLoading);
  
  return (
    <AnimatePresence mode="wait">
      {isLoading || !weatherData ? (
        <WindStatusSkeleton key="skeleton" />
      ) : (
        <Content key="content" weatherData={weatherData} />
      )}
    </AnimatePresence>
  );
}

function Content({ weatherData }) {
  const windSpeed = Math.round(weatherData.current?.windSpeed || 0);
  const windDirDegree = weatherData.current?.windDirection || 0;
  const windDirection = getWindDirection(windDirDegree);

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
        <div className="flex items-center gap-2 mb-4 shrink-0 relative z-10">
          <h3 className="text-[14px] font-[700] uppercase text-white tracking-[0.1em] drop-shadow-sm">
            Wind Status
          </h3>
        </div>

        {/* Compass & Values */}
        <div className="flex-1 flex flex-col items-center justify-center mt-2 relative z-10">
          
          <div className="relative w-[160px] h-[160px] flex items-center justify-center">
            
            {/* Compass Rings & Ticks SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
              {/* Outer Ring */}
              <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
              {/* Dashed Mid Ring */}
              <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="4 4" />
              {/* Inner Ring */}
              <circle cx="50" cy="50" r="28" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
              
              {/* Tick Marks (360 degrees, 12 major) */}
              {[...Array(12)].map((_, i) => (
                <g key={i} transform={`rotate(${i * 30} 50 50)`}>
                  <line x1="50" y1="2" x2="50" y2="6" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                </g>
              ))}
              {/* Minor Ticks */}
              {[...Array(36)].map((_, i) => (
                i % 3 !== 0 && (
                  <g key={`minor-${i}`} transform={`rotate(${i * 10} 50 50)`}>
                    <line x1="50" y1="2" x2="50" y2="4" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                  </g>
                )
              ))}
            </svg>

            {/* Center Glow */}
            <div className="absolute inset-0 m-auto w-[80px] h-[80px] rounded-full bg-[rgba(94,169,255,0.12)] blur-[15px] pointer-events-none" />

            {/* N/S/E/W Marks */}
            <span className="absolute top-[10px] text-[11px] text-[#A7B2C7] font-[700] drop-shadow-sm">N</span>
            <span className="absolute bottom-[10px] text-[11px] text-[#A7B2C7] font-[700] drop-shadow-sm">S</span>
            <span className="absolute left-[12px] text-[11px] text-[#A7B2C7] font-[700] drop-shadow-sm">W</span>
            <span className="absolute right-[12px] text-[11px] text-[#A7B2C7] font-[700] drop-shadow-sm">E</span>

            {/* Centered Speed */}
            <div className="flex flex-col items-center z-10 drop-shadow-lg mt-1">
              <span className="text-[36px] font-[700] text-white leading-none tracking-tight">{windSpeed}</span>
              <span className="text-[13px] text-[#A7B2C7] font-[600] mt-1">km/h</span>
            </div>

            {/* Arrow */}
            <div 
              className="absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-1000 ease-out"
              style={{ transform: `rotate(${windDirDegree}deg)` }}
            >
              <div className="w-full h-full relative">
                <Navigation 
                  size={26} 
                  className="text-[#5EA9FF] absolute top-[-14px] left-1/2 -translate-x-1/2 fill-[#5EA9FF] drop-shadow-[0_4px_16px_rgba(94,169,255,0.8)]" 
                />
              </div>
            </div>
          </div>

          {/* Direction Label */}
          <div className="mt-6 mb-2">
            <span className="text-[15px] font-[600] text-white drop-shadow-md tracking-wide">{windDirection}</span>
          </div>

        </div>

      </AnalyticsCardWrapper>
    </motion.div>
  );
}
