import React from 'react';
import { motion } from 'framer-motion';
import AnalyticsCardWrapper from './AnalyticsCardWrapper';
import SevenDayForecastCard from './SevenDayForecastCard';
import WeatherMapCard from './WeatherMapCard';
import AQICard from './AQICard';
import PrecipitationCard from './PrecipitationCard';
import WindStatusCard from './WindStatusCard';
import SunMoonCard from './SunMoonCard';
import DetailsCard from './DetailsCard';
import { staggerContainer, viewportReveal } from '../utils/animations';

export default function AnalyticsGrid() {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10 mt-4 pb-24 z-20 flex flex-col gap-6">
      
      {/* Row 1: 3-Column Layout (33% | 34% | 33%) */}
      <motion.div 
        variants={staggerContainer(0.15, 0)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[460px]"
      >
        <motion.div variants={viewportReveal} className="h-full">
          <SevenDayForecastCard />
        </motion.div>

        <motion.div variants={viewportReveal} className="h-full">
          <WeatherMapCard />
        </motion.div>

        <motion.div variants={viewportReveal} className="h-full">
          <AQICard />
        </motion.div>
      </motion.div>

      {/* Row 2: 4-Column Layout (25% | 25% | 25% | 25%) */}
      <motion.div 
        variants={staggerContainer(0.12, 0)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-auto lg:min-h-[360px]"
      >
        <motion.div variants={viewportReveal} className="h-full">
          <PrecipitationCard />
        </motion.div>

        <motion.div variants={viewportReveal} className="h-full">
          <WindStatusCard />
        </motion.div>

        <motion.div variants={viewportReveal} className="h-full">
          <SunMoonCard />
        </motion.div>

        <motion.div variants={viewportReveal} className="h-full">
          <DetailsCard />
        </motion.div>
      </motion.div>

    </div>
  );
}
