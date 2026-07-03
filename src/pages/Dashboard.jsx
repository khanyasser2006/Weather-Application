import React from 'react';
import HeroContent from '../components/HeroContent';
import HeroWeatherCard from '../components/HeroWeatherCard';
import HourlyForecast from '../components/HourlyForecast';
import FeatureCards from '../components/FeatureCards';
import AnalyticsGrid from '../components/AnalyticsGrid';
import NewsletterCTA from '../components/NewsletterCTA';

export default function Dashboard() {
  return (
    <div className="flex flex-col w-full">
      {/* =========================================
          LAYER 1: HERO & HOURLY FORECAST 
          ========================================= */}
      <div className="w-full flex flex-col">
        {/* Hero Section Container */}
          <main className="w-full max-w-[1440px] mx-auto px-6 md:px-10 flex flex-col justify-center mt-12 pb-6">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 w-full mt-8 lg:mt-0">
              {/* Left Column: 55% */}
              <div className="w-full lg:w-[55%] flex flex-col justify-center">
                <HeroContent />
              </div>
              {/* Right Column: 45% */}
              <div className="w-full lg:w-[45%] flex justify-end items-end pb-12 lg:pb-0 lg:mt-32">
                <HeroWeatherCard />
              </div>
            </div>
          </main>

          {/* Hourly Forecast Section */}
          <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10 pb-8 mt-auto z-20">
            <HourlyForecast />
          </div>
        </div>

      {/* =========================================
          LAYER 2: ANALYTICS DASHBOARD 
          ========================================= */}
      <div className="w-full flex-1 flex flex-col">
        <div className="w-full flex-1 flex flex-col pt-4 pb-0">
          {/* Feature Cards Section */}
          <FeatureCards />

          {/* Analytics Grid Section */}
          <AnalyticsGrid />

          {/* Newsletter CTA Section */}
          <NewsletterCTA />
        </div>
      </div>
    </div>
  );
}
