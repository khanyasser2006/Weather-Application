import React from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, Wind, AlertTriangle, Lightbulb } from 'lucide-react';

const featureCards = [
  {
    title: '7 Day Forecast',
    description: 'Extended weekly outlook',
    icon: CalendarDays,
  },
  {
    title: 'Air Quality',
    description: 'Good • 42 AQI',
    icon: Wind,
  },
  {
    title: 'Severe Alerts',
    description: 'No active warnings',
    icon: AlertTriangle,
  },
  {
    title: 'Weather Insights',
    description: 'UV Index is moderate',
    icon: Lightbulb,
  },
];

export default function FeatureCards() {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10 mt-6 pb-12 z-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featureCards.map((card, index) => {
          return (
            <motion.div
              key={index}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="w-full min-h-[180px] rounded-[24px] bg-[rgba(10,15,25,0.55)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.06)] p-[32px] flex flex-col items-start justify-between cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.25)] relative overflow-hidden group"
            >
              {/* Very Subtle Ambient Glow */}
              <div className="absolute top-0 left-0 w-[120px] h-[120px] bg-[rgba(255,138,61,0.04)] blur-[30px] rounded-full pointer-events-none transition-opacity duration-300 group-hover:opacity-100 opacity-60" />

              {/* Icon */}
              <div className="shrink-0 mb-6 relative z-10 w-[48px] h-[48px] bg-[#FF8A3D] rounded-[14px] flex items-center justify-center shadow-[0_8px_16px_rgba(255,138,61,0.25)]">
                <card.icon size={24} className="text-white" strokeWidth={2} />
              </div>
              
              <div className="flex flex-col items-start relative z-10 w-full mt-auto">
                <h3 className="text-[18px] font-[700] text-white leading-tight mb-2 drop-shadow-sm">
                  {card.title}
                </h3>
                <p className="text-[14px] text-[#A7B2C7] leading-relaxed font-[500] font-sans">
                  {card.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
