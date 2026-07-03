import React from 'react';
import HeroWeatherCard from '../components/HeroWeatherCard';
import HourlyForecast from '../components/HourlyForecast';
import SunMoonCard from '../components/SunMoonCard';
import WindStatusCard from '../components/WindStatusCard';
import useWeatherStore from '../store/useWeatherStore';

export default function Tomorrow() {
  const location = useWeatherStore(state => state.location);

  return (
    <div className="flex flex-col w-full max-w-[1440px] mx-auto px-6 md:px-10 mt-12 pb-12 flex-1">
      <div className="flex flex-col gap-2 mb-10">
        <h1 className="text-[36px] font-[800] text-white tracking-tight drop-shadow-sm">
          Tomorrow's Forecast
        </h1>
        <p className="text-[16px] text-white/70 font-medium">
          Detailed outlook for tomorrow in {location?.name || 'your location'}.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
        {/* Left Column */}
        <div className="col-span-1 lg:col-span-8 flex flex-col gap-8">
          <HourlyForecast dayOffset={1} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <SunMoonCard />
             <WindStatusCard />
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-1 lg:col-span-4 flex flex-col gap-8">
          <HeroWeatherCard dayOffset={1} />
        </div>
      </div>
    </div>
  );
}
