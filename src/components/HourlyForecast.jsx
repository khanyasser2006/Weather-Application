import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import useWeatherStore from '../store/useWeatherStore';
import { getWeatherIconProps } from '../utils/weatherUtils';
import { Link } from 'react-router-dom';
import { staggerContainer, staggerItem } from '../utils/animations';
import HourlyForecastSkeleton from './skeletons/HourlyForecastSkeleton';

export default function HourlyForecast({ dayOffset = 0 }) {
  const weatherData = useWeatherStore(state => state.weatherData);
  const isLoading = useWeatherStore(state => state.isLoading);

  return (
    <AnimatePresence mode="wait">
      {isLoading || !weatherData ? (
        <HourlyForecastSkeleton key="skeleton" />
      ) : (
        <Content 
          key="content" 
          dayOffset={dayOffset} 
          weatherData={weatherData} 
        />
      )}
    </AnimatePresence>
  );
}

function Content({ dayOffset, weatherData }) {
  const now = new Date();
  
  let actualStartIndex = 0;
  if (dayOffset === 0) {
    const startIndex = weatherData.hourly.findIndex(h => new Date(h.time) >= now);
    actualStartIndex = startIndex !== -1 ? startIndex : 0;
  } else {
    // If future day, find the index where it's 00:00 of that target day
    const targetDate = new Date(now);
    targetDate.setDate(targetDate.getDate() + dayOffset);
    targetDate.setHours(0, 0, 0, 0);
    const targetDateString = targetDate.toISOString().split('T')[0];
    const startIndex = weatherData.hourly.findIndex(h => h.time.startsWith(targetDateString));
    actualStartIndex = startIndex !== -1 ? startIndex : dayOffset * 24;
  }

  const hourlyData = weatherData.hourly.slice(actualStartIndex, actualStartIndex + 10).map((hour, i) => {
    const d = new Date(hour.time);
    const timeString = (i === 0 && dayOffset === 0) ? 'Now' : d.toLocaleTimeString('en-US', { hour: 'numeric' });
    const { iconName, color } = getWeatherIconProps(hour.weatherCode);
    return {
      time: timeString,
      temp: `${Math.round(hour.temp)}°`,
      iconName,
      color,
      active: i === 0
    };
  });

  return (
    <motion.div 
      key="content"
      variants={staggerContainer(0.08, 0)}
      initial="hidden"
      whileInView="visible"
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      viewport={{ once: true, margin: "-50px" }}
      className="w-full h-[250px] md:h-[280px] rounded-[24px] bg-[rgba(10,15,25,0.55)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.04)] border-t-[rgba(255,138,61,0.25)] flex flex-col overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.25)] relative"
    >
      
      {/* Atmospheric Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,138,61,0.15),transparent_60%)] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_40%,rgba(255,138,61,0.06)_100%)] pointer-events-none z-0" />

      {/* Header */}
      <div className="flex justify-between items-center w-full px-8 py-6 border-b border-[rgba(255,255,255,0.05)] shrink-0 relative z-10">
        <h3 className="text-[14px] font-[700] tracking-[0.08em] uppercase text-[#FF8A3D] drop-shadow-sm">
          Hourly Forecast
        </h3>
        <Link to="/hourly-forecast" className="text-[#FF8A3D] hover:text-[#ff7a24] transition-colors text-[13px] font-[600] flex items-center gap-1 group">
          View Full Forecast <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
        </Link>
      </div>

      {/* Forecast Items Container */}
      <div className="flex-1 overflow-x-auto hide-scrollbar snap-x snap-mandatory flex items-stretch py-6 relative z-10">
        {hourlyData.map((item, index) => {
          const Icon = Icons[item.iconName] || Icons.Cloud;
          return (
            <motion.div variants={staggerItem} key={index} className="flex relative shrink-0 snap-start min-w-[96px] sm:min-w-[100px] lg:flex-1">
              {/* Vertical Divider */}
              {index > 0 && (
                <div className="absolute left-0 top-3 bottom-3 w-px bg-[rgba(255,255,255,0.06)]" />
              )}

              {/* Item Content */}
              <motion.div 
                whileHover={{ y: -2 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="flex flex-col items-center justify-center gap-3 md:gap-4 w-full h-full relative cursor-pointer"
              >
                {/* Active State Highlight */}
                {item.active && (
                  <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 w-[32px] h-[3px] bg-[#FF8A3D] rounded-b-md shadow-[0_4px_12px_rgba(255,138,61,0.6)]" />
                )}

                <span className={`text-[13px] ${item.active ? 'text-white font-[600]' : 'text-[#A7B2C7] font-[500]'}`}>
                  {item.time}
                </span>
                
                <Icon size={26} className={item.color} strokeWidth={item.active ? 2 : 1.5} style={item.active ? { filter: 'drop-shadow(0 0 10px rgba(250, 204, 21, 0.5))' } : {}} />
                
                <span className="text-[20px] md:text-[24px] font-[700] text-white tracking-tight">
                  {item.temp}
                </span>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

    </motion.div>
  );
}
