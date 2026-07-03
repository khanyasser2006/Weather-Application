import React from 'react';
import WeatherMapCard from '../components/WeatherMapCard';
import useWeatherStore from '../store/useWeatherStore';

export default function Radar() {
  const location = useWeatherStore(state => state.location);

  return (
    <div className="flex flex-col w-full max-w-[1440px] mx-auto px-6 md:px-10 mt-12 pb-12 flex-1 h-full">
      <div className="flex flex-col gap-2 mb-10">
        <h1 className="text-[36px] font-[800] text-white tracking-tight drop-shadow-sm">
          Interactive Radar
        </h1>
        <p className="text-[16px] text-white/70 font-medium">
          Live precipitation and weather map for {location?.name || 'your location'}.
        </p>
      </div>

      <div className="w-full h-[600px] lg:h-[700px] rounded-[24px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.25)] border border-[rgba(255,255,255,0.04)] border-t-[rgba(255,138,61,0.25)]">
        <WeatherMapCard />
      </div>
    </div>
  );
}
