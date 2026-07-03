import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnalyticsCardWrapper from './AnalyticsCardWrapper';
import * as Icons from 'lucide-react';
import useWeatherStore from '../store/useWeatherStore';
import { getWeatherIconProps } from '../utils/weatherUtils';
import { Link } from 'react-router-dom';
import SevenDayForecastSkeleton from './skeletons/SevenDayForecastSkeleton';

export default function SevenDayForecastCard() {
  const weatherData = useWeatherStore(state => state.weatherData);
  const isLoading = useWeatherStore(state => state.isLoading);
  
  return (
    <AnimatePresence mode="wait">
      {isLoading || !weatherData ? (
        <SevenDayForecastSkeleton key="skeleton" />
      ) : (
        <Content key="content" weatherData={weatherData} />
      )}
    </AnimatePresence>
  );
}

function Content({ weatherData }) {
  const minOfAll = Math.min(...weatherData.daily.map(d => d.tempMin));
  const maxOfAll = Math.max(...weatherData.daily.map(d => d.tempMax));
  const range = maxOfAll - minOfAll || 1;

  const forecastData = weatherData.daily.slice(0, 7).map((d, i) => {
    const dateObj = new Date(d.date);
    const { iconName, color } = getWeatherIconProps(d.weatherCode);
    const dayStr = i === 0 ? 'Today' : dateObj.toLocaleDateString('en-US', { weekday: 'short' });
    const dateStr = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    // Calculate bar width and position
    const leftPercent = ((d.tempMin - minOfAll) / range) * 100;
    const widthPercent = ((d.tempMax - d.tempMin) / range) * 100;

    return {
      day: dayStr,
      date: dateStr,
      iconName,
      iconColor: color,
      high: `${Math.round(d.tempMax)}°`,
      low: `${Math.round(d.tempMin)}°`,
      barWidth: `${Math.max(10, widthPercent)}%`, // Ensure it has at least 10% width so it's visible
      barLeft: `${leftPercent}%`
    };
  });

  return (
    <motion.div
      key="content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      transition={{ duration: 0.3 }}
      className="w-full h-full"
    >
      <AnalyticsCardWrapper className="flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center w-full px-6 py-5 border-b border-[rgba(255,255,255,0.05)] shrink-0 relative z-50">
          <h3 className="text-[14px] font-[600] tracking-[0.08em] uppercase text-[rgba(255,255,255,0.9)]">
            7 Day Forecast
          </h3>
          <Link to="/forecast-extended" className="text-[#FF8A3D] hover:text-[#ff7a24] transition-colors text-[13px] font-[600] font-sans flex items-center gap-1 group relative z-50">
            View more <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Link>
        </div>

        {/* Rows */}
        <div className="flex-1 flex flex-col justify-evenly px-8 py-4 overflow-y-auto">
          {forecastData.map((item, index) => {
            const Icon = Icons[item.iconName] || Icons.Cloud;
            return (
              <div key={index} className="flex items-center justify-between w-full h-[56px]">
                {/* Day & Date */}
                <div className="flex flex-col w-[60px] shrink-0">
                  <span className="text-[15px] font-[600] text-white leading-tight">{item.day}</span>
                  <span className="text-[13px] text-[#A7B2C7] leading-tight font-[500]">{item.date}</span>
                </div>

                {/* Icon */}
                <div className="w-[48px] flex justify-center shrink-0">
                  <Icon size={24} className={item.iconColor} strokeWidth={1.5} />
                </div>

                {/* High Temp */}
                <div className="w-[40px] flex justify-end shrink-0">
                  <span className="text-[16px] font-[600] text-white">{item.high}</span>
                </div>

                {/* Temperature Bar */}
                <div className="flex-1 mx-6 h-[6px] rounded-full bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.03)] relative overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]">
                  <div 
                    className="absolute h-full rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]"
                    style={{ 
                      width: item.barWidth, 
                      left: item.barLeft,
                      background: 'linear-gradient(90deg, #5EA9FF 0%, #FF9B45 100%)'
                    }}
                  />
                </div>

                {/* Low Temp */}
                <div className="w-[40px] flex justify-start shrink-0">
                  <span className="text-[16px] font-[500] text-[#A7B2C7]">{item.low}</span>
                </div>
              </div>
            );
          })}
        </div>
      </AnalyticsCardWrapper>
    </motion.div>
  );
}
