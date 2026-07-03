import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, ArrowUp, Droplets, Wind, Gauge, Eye } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import useWeatherStore from '../store/useWeatherStore';
import { getWeatherDescription, getWeatherIconProps } from '../utils/weatherUtils';
import useIntroAnimation from '../hooks/useIntroAnimation';
import HeroWeatherCardSkeleton from './skeletons/HeroWeatherCardSkeleton';

export default function HeroWeatherCard({ dayOffset = 0 }) {
  const weatherData = useWeatherStore(state => state.weatherData);
  const isLoading = useWeatherStore(state => state.isLoading);

  const isFirstLoad = useIntroAnimation();

  return (
    <AnimatePresence mode="wait">
      {isLoading || !weatherData ? (
        <HeroWeatherCardSkeleton key="skeleton" />
      ) : (
        <Content 
          key="content"
          dayOffset={dayOffset}
          weatherData={weatherData}
          isFirstLoad={isFirstLoad}
        />
      )}
    </AnimatePresence>
  );
}

function Content({ dayOffset, weatherData, isFirstLoad }) {
  const isToday = dayOffset === 0;
  const targetData = isToday ? weatherData.current : weatherData.daily[dayOffset];
  const todayDaily = weatherData.daily[dayOffset] || {};
  
  const temp = isToday ? targetData?.temp : targetData?.tempMax;
  const feelsLike = isToday ? targetData?.feelsLike : targetData?.tempMax;
  const humidity = isToday ? targetData?.humidity : (targetData?.humidity || 50);
  const windSpeed = isToday ? targetData?.windSpeed : (targetData?.windSpeed || 10);
  const pressure = isToday ? targetData?.pressure : (targetData?.pressure || 1012);
  const visibility = isToday ? targetData?.visibility : (targetData?.visibility || 10000);
  const desc = getWeatherDescription(targetData?.weatherCode);
  const iconProps = getWeatherIconProps(targetData?.weatherCode);
  const IconComponent = LucideIcons[iconProps.iconName] || LucideIcons.Cloud;

  return (
    <motion.div
      key="content"
      initial={isFirstLoad ? { opacity: 0, x: 40, scale: 0.96 } : { opacity: 0 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      transition={{ duration: 0.7, delay: isFirstLoad ? 0.6 : 0, ease: "easeOut" }}
      className="w-full max-w-[500px] h-auto min-h-[380px] rounded-[24px] relative overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.40)] flex flex-col p-[36px] border border-[rgba(255,255,255,0.06)]"
    >
      {/* Deep Glass Layers */}
      <div className="absolute inset-0 bg-[rgba(8,12,22,0.82)] z-0 pointer-events-none" />
      <div className="absolute inset-0 backdrop-blur-[30px] z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(255,255,255,0.08)] to-transparent z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,40,90,0.22)] to-transparent z-0 pointer-events-none" />

      {/* Top Section: 2-Column Split */}
      <div className="flex items-center justify-between w-full relative z-10 pb-8 mb-6 border-b border-[rgba(255,255,255,0.06)]">
        
        {/* LEFT: Weather Illustration */}
        <div className="flex-1 flex justify-start">
          <div className="relative w-[130px] h-[130px] flex items-center justify-center">
            {/* Dynamic Glow based on icon type */}
            <div className={`absolute top-0 right-0 w-[80px] h-[80px] ${iconProps.iconName.includes('Sun') ? 'bg-[#FF8A3D]' : 'bg-blue-400'} blur-[40px] opacity-20 rounded-full`} />
            
            <IconComponent size={90} strokeWidth={1.5} className={`absolute z-10 ${iconProps.iconName.includes('Sun') ? 'drop-shadow-[0_0_25px_rgba(255,138,61,0.7)]' : 'drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]'} ${iconProps.color}`} />
          </div>
        </div>
        
        {/* RIGHT: Temperature Block */}
        <div className="flex-1 flex flex-col items-end text-right pr-2">
          <div className="flex flex-col">
            <span className="text-[72px] font-[800] text-white leading-[1] tracking-tighter drop-shadow-md">
              {temp ? Math.round(temp) : '--'}°
            </span>
            <span className="text-[14px] text-white/80 font-[500] ml-1 mt-1">
              Feels like {feelsLike ? Math.round(feelsLike) : '--'}°
            </span>
          </div>
          <span className="text-[20px] font-[500] text-white mt-2 tracking-wide">{desc}</span>
        </div>
      </div>

      {/* Middle Section: Metrics Row */}
      <div className="flex items-center justify-between w-full mt-auto mb-8 relative z-10 px-2">
        <div className="flex flex-col items-center gap-1.5">
          <Droplets size={20} className="text-[#A7B2C7]" strokeWidth={1.5} />
          <span className="text-[12px] text-[#A7B2C7] font-[500]">Humidity</span>
          <span className="text-[15px] font-[600] text-white">{Math.round(humidity || 0)}%</span>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <Wind size={20} className="text-[#A7B2C7]" strokeWidth={1.5} />
          <span className="text-[12px] text-[#A7B2C7] font-[500]">Wind</span>
          <span className="text-[15px] font-[600] text-white">{Math.round(windSpeed || 0)} km/h</span>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <Gauge size={20} className="text-[#A7B2C7]" strokeWidth={1.5} />
          <span className="text-[12px] text-[#A7B2C7] font-[500]">Pressure</span>
          <span className="text-[15px] font-[600] text-white">{Math.round(pressure || 0)} hPa</span>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <Eye size={20} className="text-[#A7B2C7]" strokeWidth={1.5} />
          <span className="text-[12px] text-[#A7B2C7] font-[500]">Visibility</span>
          <span className="text-[15px] font-[600] text-white">{Math.round((visibility || 0)/1000)} km</span>
        </div>
      </div>

      {/* Bottom Section: Temperature Strip */}
      <div className="flex justify-center w-full relative z-10 mt-2">
        <div className="flex items-center gap-8 bg-[rgba(255,255,255,0.06)] rounded-full px-8 py-3 border border-[rgba(255,255,255,0.04)] shadow-[0_8px_16px_rgba(0,0,0,0.15)] backdrop-blur-md">
          <div className="flex items-center gap-3">
            <ArrowUp size={18} className="text-[#FF8A3D]" strokeWidth={2.5} />
            <span className="text-[18px] font-[600] text-white">{Math.round(todayDaily?.tempMax || 0)}°</span>
          </div>
          <div className="w-px h-5 bg-white/10"></div>
          <div className="flex items-center gap-3">
            <ArrowDown size={18} className="text-[#5EA9FF]" strokeWidth={2.5} />
            <span className="text-[18px] font-[600] text-white">{Math.round(todayDaily?.tempMin || 0)}°</span>
          </div>
        </div>
      </div>

    </motion.div>
  );
}
