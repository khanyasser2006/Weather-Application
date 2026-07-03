import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import useWeatherStore from '../store/useWeatherStore';
import { staggerContainer, heroStaggerItem } from '../utils/animations';
import TextReveal from './TextReveal';
import useIntroAnimation from '../hooks/useIntroAnimation';

export default function HeroContent() {
  const location = useWeatherStore(state => state.location);
  const displayLocation = location ? `${location.name}${location.country ? `, ${location.country}` : ''}` : 'Loading...';
  const isFirstLoad = useIntroAnimation();

  return (
    <div className="flex flex-col justify-center py-10 max-w-[500px]">
      <motion.div
        variants={staggerContainer(isFirstLoad ? 0.12 : 0, isFirstLoad ? 0.3 : 0)}
        initial="hidden"
        animate="visible"
        className="flex flex-col"
      >
        {/* Greeting Label */}
        <motion.div variants={heroStaggerItem} className="flex items-center gap-2 mb-4 opacity-80">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
          <span className="text-[24px] text-white tracking-wide capitalize">Good Morning</span>
        </motion.div>

        <div className="text-[48px] md:text-[54px] font-semibold leading-[1.1] tracking-[-0.02em] text-white mb-5 max-w-[500px]">
          <TextReveal text="A Weather That" delay={isFirstLoad ? 0.4 : 0} stagger={0.05} />
          <br /> 
          <TextReveal text="Understands You" className="text-[#FF8A3D]" delay={isFirstLoad ? 0.5 : 0} stagger={0.05} />
        </div>
        
        <motion.p variants={heroStaggerItem} className="text-[16px] md:text-[18px] text-white/70 font-normal max-w-[450px] leading-[1.5] mb-10">
          Get Accurate Real Time Forecast, Air Quality Update And Severe Weather Alerts For Your Location
        </motion.p>

          {/* Location Status Row */}
          <motion.div variants={heroStaggerItem} className="flex items-center gap-4 text-white ml-2">
            <div className="flex items-center gap-2 text-white/90">
              <MapPin size={14} className="text-[#FF8A3D]" />
              <span className="text-[13px] font-medium tracking-wide">{displayLocation}</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-white/20" />
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-[13px] text-white/50">Last updated: Just now</span>
            </div>
          </motion.div>

      </motion.div>
    </div>
  );
}
