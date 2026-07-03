import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnalyticsCardWrapper from './AnalyticsCardWrapper';
import { Sun, Moon, Clock, Sunrise, Sunset, Eclipse } from 'lucide-react';
import useWeatherStore from '../store/useWeatherStore';
import { getMoonPhase, getSolarNoon, formatDaylightDuration } from '../utils/astronomyUtils';
import SunMoonSkeleton from './skeletons/SunMoonSkeleton';

export default function SunMoonCard() {
  const weatherData = useWeatherStore(state => state.weatherData);
  const isLoading = useWeatherStore(state => state.isLoading);
  
  return (
    <AnimatePresence mode="wait">
      {isLoading || !weatherData ? (
        <SunMoonSkeleton key="skeleton" />
      ) : (
        <Content key="content" weatherData={weatherData} />
      )}
    </AnimatePresence>
  );
}

function Content({ weatherData }) {
  const todayDaily = weatherData.daily?.[0];
  const sunMoon = weatherData.sunMoon;
  
  const sunriseStr = sunMoon?.sunrise ? new Date(sunMoon.sunrise).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) : '00:00';
  const sunsetStr = sunMoon?.sunset ? new Date(sunMoon.sunset).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) : '00:00';
  
  const daylightDuration = sunMoon?.daylightDuration || 0;
  const dayLength = formatDaylightDuration(daylightDuration);
  const solarNoon = sunMoon?.sunrise ? getSolarNoon(new Date(sunMoon.sunrise), daylightDuration) : '--:--';

  const { phaseName, illumination } = getMoonPhase(new Date());

  return (
    <motion.div
      key="content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      transition={{ duration: 0.3 }}
      className="w-full h-full"
    >
      <AnalyticsCardWrapper className="flex flex-col px-6 py-6">
        
        {/* Header */}
        <div className="flex items-center gap-2 mb-4 shrink-0 relative z-10">
          <h3 className="text-[14px] font-[700] uppercase text-white tracking-[0.1em] drop-shadow-sm">
            Astronomy
          </h3>
        </div>

        <div className="flex-1 flex flex-col justify-between relative z-10 gap-4">
          
          {/* Sun Data Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col bg-white/[0.02] border border-[rgba(255,255,255,0.04)] rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1 text-[#A7B2C7]">
                <Sunrise size={14} className="text-[#FF8A3D]" />
                <span className="text-[12px] font-[600] uppercase">Sunrise</span>
              </div>
              <span className="text-[16px] font-[700] text-white">{sunriseStr}</span>
            </div>

            <div className="flex flex-col bg-white/[0.02] border border-[rgba(255,255,255,0.04)] rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1 text-[#A7B2C7]">
                <Sunset size={14} className="text-[#FF8A3D]" />
                <span className="text-[12px] font-[600] uppercase">Sunset</span>
              </div>
              <span className="text-[16px] font-[700] text-white">{sunsetStr}</span>
            </div>

            <div className="flex flex-col bg-white/[0.02] border border-[rgba(255,255,255,0.04)] rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1 text-[#A7B2C7]">
                <Clock size={14} className="text-[#FACC15]" />
                <span className="text-[12px] font-[600] uppercase">Day Length</span>
              </div>
              <span className="text-[16px] font-[700] text-white">{dayLength}</span>
            </div>

            <div className="flex flex-col bg-white/[0.02] border border-[rgba(255,255,255,0.04)] rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1 text-[#A7B2C7]">
                <Sun size={14} className="text-[#FACC15]" />
                <span className="text-[12px] font-[600] uppercase">Solar Noon</span>
              </div>
              <span className="text-[16px] font-[700] text-white">{solarNoon}</span>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-[rgba(255,255,255,0.08)] my-1" />

          {/* Moon Phase */}
          <div className="flex items-center justify-between bg-white/[0.02] border border-[rgba(255,255,255,0.04)] rounded-xl p-4">
            <div className="flex items-center gap-4">
              <div className="relative w-[40px] h-[40px] flex items-center justify-center">
                <div className="absolute inset-0 bg-[#BFDBFE] blur-[16px] opacity-20 rounded-full" />
                <Moon size={28} className="text-[#BFDBFE] fill-[#BFDBFE] drop-shadow-[0_0_12px_rgba(191,219,254,0.8)] relative z-10" />
              </div>
              <div className="flex flex-col">
                <span className="text-[12px] font-[600] uppercase text-[#A7B2C7] mb-0.5">Moon Phase</span>
                <span className="text-[16px] font-[700] text-white tracking-wide">{phaseName}</span>
              </div>
            </div>
            
            <div className="flex flex-col items-end">
              <span className="text-[12px] font-[600] uppercase text-[#A7B2C7] mb-0.5">Illumination</span>
              <div className="flex items-center gap-1.5">
                <Eclipse size={14} className="text-[#BFDBFE]" />
                <span className="text-[16px] font-[700] text-white tracking-wide">{illumination}%</span>
              </div>
            </div>
          </div>

        </div>
      </AnalyticsCardWrapper>
    </motion.div>
  );
}

