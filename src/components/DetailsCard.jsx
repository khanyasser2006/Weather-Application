import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnalyticsCardWrapper from './AnalyticsCardWrapper';
import useWeatherStore from '../store/useWeatherStore';
import DetailsSkeleton from './skeletons/DetailsSkeleton';

export default function DetailsCard() {
  const weatherData = useWeatherStore(state => state.weatherData);
  const isLoading = useWeatherStore(state => state.isLoading);
  
  return (
    <AnimatePresence mode="wait">
      {isLoading || !weatherData ? (
        <DetailsSkeleton key="skeleton" />
      ) : (
        <Content key="content" weatherData={weatherData} />
      )}
    </AnimatePresence>
  );
}

function Content({ weatherData }) {
  const current = weatherData.current || {};
  
  const getUvIndexText = (uvi) => {
    if (uvi <= 2) return ' (Low)';
    if (uvi <= 5) return ' (Moderate)';
    if (uvi <= 7) return ' (High)';
    if (uvi <= 10) return ' (Very High)';
    return ' (Extreme)';
  };

  const detailsData = [
    { label: 'Humidity', value: `${Math.round(current.humidity || 0)}%` },
    { label: 'Wind', value: `${Math.round(current.windSpeed || 0)} km/h` },
    { label: 'Pressure', value: `${Math.round(current.pressure || 0)} hPa` },
    { label: 'Visibility', value: `${Math.round((current.visibility || 0) / 1000)} km` },
    { label: 'UV Index', value: `${Math.round(current.uvIndex || 0)}${getUvIndexText(current.uvIndex || 0)}` },
    { label: 'Dew Point', value: `${Math.round(current.temp - ((100 - (current.humidity || 0)) / 5))}°` }, // Approximation
  ];

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
            Details
          </h3>
        </div>

        <div className="flex-1 flex flex-col justify-between relative z-10">
          {detailsData.map((item, index) => (
            <div key={index} className="flex items-center justify-between py-[14px] border-b border-[rgba(255,255,255,0.06)] last:border-0 last:pb-0 first:pt-0">
              <span className="text-[14px] text-[#A7B2C7] font-[500]">{item.label}</span>
              <span className="text-[15px] font-[600] text-white tracking-wide">{item.value}</span>
            </div>
          ))}
        </div>

      </AnalyticsCardWrapper>
    </motion.div>
  );
}
