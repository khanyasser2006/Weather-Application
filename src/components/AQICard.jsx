import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnalyticsCardWrapper from './AnalyticsCardWrapper';
import useWeatherStore from '../store/useWeatherStore';
import { getAqiData } from '../utils/weatherUtils';
import { Link } from 'react-router-dom';
import AQISkeleton from './skeletons/AQISkeleton';

export default function AQICard() {
  const weatherData = useWeatherStore(state => state.weatherData);
  const isLoading = useWeatherStore(state => state.isLoading);
  
  return (
    <AnimatePresence mode="wait">
      {isLoading || !weatherData ? (
        <AQISkeleton key="skeleton" />
      ) : (
        <Content key="content" weatherData={weatherData} />
      )}
    </AnimatePresence>
  );
}

function Content({ weatherData }) {
  const aqiScore = weatherData.aqi?.score || 0;
  const aqiData = getAqiData(aqiScore);
  
  return (
    <motion.div
      key="content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      transition={{ duration: 0.3 }}
      className="w-full h-full"
    >
      <AnalyticsCardWrapper className="flex flex-col p-[24px] pb-0">
        
        {/* Card Header */}
        <h4 className="text-[14px] font-[700] text-white uppercase tracking-[0.1em] drop-shadow-sm mb-0 shrink-0">Air Quality Index</h4>

        {/* Gauge & Number */}
        <div className="flex-1 flex flex-col items-center justify-center mt-2 mb-2 min-h-0">
          <div className="relative w-[200px] h-[200px] flex items-center justify-center shrink-0">
            
            {/* Circular Gauge */}
            <svg className="absolute inset-0 w-full h-full transform -rotate-90 pointer-events-none" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="aqi-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" />   {/* Blue */}
                  <stop offset="50%" stopColor="#06B6D4" />  {/* Cyan */}
                  <stop offset="100%" stopColor="#10B981" /> {/* Green */}
                </linearGradient>
                <filter id="aqi-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Background Track */}
              <circle 
                cx="50" cy="50" r="42" 
                fill="none" 
                stroke="rgba(255,255,255,0.04)" 
                strokeWidth="8"
              />
              {/* Value Track */}
              <circle 
                cx="50" cy="50" r="42" 
                fill="none" 
                stroke="url(#aqi-gradient)" 
                strokeWidth="8"
                strokeDasharray="264"
                strokeDashoffset={aqiData.dashOffset}
                strokeLinecap="round"
                filter="url(#aqi-glow)"
              />
            </svg>

            {/* Number Centered */}
            <div className="flex flex-col items-center mt-2">
              <span className="text-[88px] font-[700] text-white leading-[0.85] tracking-tight drop-shadow-lg">{aqiScore}</span>
              <span className={`text-[18px] ${aqiData.color} font-[600] tracking-wide mt-2 drop-shadow-sm`}>{aqiData.text}</span>
            </div>

          </div>
        </div>

        {/* Description */}
        <div className="mt-2 mb-4 text-center px-2 shrink-0">
          <p className="text-[14px] text-[#A7B2C7] leading-relaxed font-[500] font-sans" dangerouslySetInnerHTML={{ __html: aqiData.description }} />
        </div>

        {/* Bottom CTA */}
        <div className="mt-auto pt-3 pb-4 w-full flex justify-center border-t border-[rgba(255,255,255,0.05)] relative z-50 shrink-0">
          <Link to="/aqi-details" className="text-[#FF8A3D] hover:text-[#ff7a24] transition-colors text-[13px] font-[600] flex items-center gap-1 group relative z-50">
            View more AQI details <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Link>
        </div>

      </AnalyticsCardWrapper>
    </motion.div>
  );
}
