import React from 'react';
import AnalyticsGrid from '../components/AnalyticsGrid';
import FeatureCards from '../components/FeatureCards';
import useWeatherStore from '../store/useWeatherStore';

export default function Insights() {
  const location = useWeatherStore(state => state.location);

  return (
    <div className="flex flex-col w-full max-w-[1440px] mx-auto px-6 md:px-10 mt-12 pb-12 flex-1">
      <div className="flex flex-col gap-2 mb-10">
        <h1 className="text-[36px] font-[800] text-white tracking-tight drop-shadow-sm">
          Meteorological Insights
        </h1>
        <p className="text-[16px] text-white/70 font-medium max-w-2xl">
          Advanced atmospheric data and climate patterns for {location?.name || 'your location'}. 
          Powered by state-of-the-art predictive modeling.
        </p>
      </div>

      <div className="flex flex-col gap-8 w-full">
        <FeatureCards />
        <AnalyticsGrid />
      </div>
    </div>
  );
}
