import React from 'react';
import HeroWeatherCard from '../components/HeroWeatherCard';
import HourlyForecast from '../components/HourlyForecast';
import PrecipitationCard from '../components/PrecipitationCard';
import DetailsCard from '../components/DetailsCard';
import useWeatherStore from '../store/useWeatherStore';

export default function Today() {
  const weatherData = useWeatherStore(state => state.weatherData);
  const location = useWeatherStore(state => state.location);

  return (
    <div className="flex flex-col w-full max-w-[1440px] mx-auto px-6 md:px-10 mt-12 pb-12 flex-1">
      <div className="flex flex-col gap-2 mb-10">
        <h1 className="text-[36px] font-[800] text-white tracking-tight drop-shadow-sm">
          Today's Weather
        </h1>
        <p className="text-[16px] text-white/70 font-medium">
          Detailed forecast and metrics for {location?.name || 'your location'}.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
        {/* Left Column */}
        <div className="col-span-1 lg:col-span-8 flex flex-col gap-8">
          <HourlyForecast />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <PrecipitationCard />
             <DetailsCard />
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-1 lg:col-span-4 flex flex-col gap-8">
          <HeroWeatherCard />
        </div>
      </div>
    </div>
  );
}
