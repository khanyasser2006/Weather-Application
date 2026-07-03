import React from 'react';
import useWeatherStore from '../store/useWeatherStore';
import { getWeatherIconProps, getShortDayName } from '../utils/weatherUtils';
import * as Icons from 'lucide-react';

export default function TenDays() {
  const weatherData = useWeatherStore(state => state.weatherData);
  const location = useWeatherStore(state => state.location);
  const isLoading = useWeatherStore(state => state.isLoading);

  if (isLoading || !weatherData) {
    return (
      <div className="flex flex-col w-full max-w-[1440px] mx-auto px-6 md:px-10 mt-12 pb-12 flex-1">
        <div className="w-full h-[600px] bg-[rgba(10,15,25,0.55)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.04)] rounded-[24px] animate-pulse" />
      </div>
    );
  }

  // Use up to 10 days if available
  const tenDayData = weatherData.daily.slice(0, 10).map((day, i) => {
    const d = new Date(day.date);
    const dayName = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : getShortDayName(d.getDay());
    const { iconName, color } = getWeatherIconProps(day.weatherCode);
    
    return {
      day: dayName,
      date: i === 0 ? '' : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      iconName,
      color,
      min: Math.round(day.tempMin),
      max: Math.round(day.tempMax),
      precip: Math.round(day.precipitationProbability || 0)
    };
  });

  return (
    <div className="flex flex-col w-full max-w-[1440px] mx-auto px-6 md:px-10 mt-12 pb-12 flex-1">
      <div className="flex flex-col gap-2 mb-10">
        <h1 className="text-[36px] font-[800] text-white tracking-tight drop-shadow-sm">
          10-Day Forecast
        </h1>
        <p className="text-[16px] text-white/70 font-medium">
          Extended forecast for {location?.name || 'your location'}.
        </p>
      </div>

      <div className="w-full max-w-4xl bg-[rgba(10,15,25,0.55)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.04)] rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.25)] border-t-[rgba(255,138,61,0.25)] p-6 md:p-10 flex flex-col gap-4 relative overflow-hidden">
        
        {/* Ambient Glows */}
        <div className="absolute top-0 right-[10%] w-[400px] h-[400px] bg-[rgba(255,138,61,0.08)] blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-100px] left-[10%] w-[300px] h-[300px] bg-[rgba(255,138,61,0.05)] blur-[80px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-2">
          {tenDayData.map((item, index) => {
            const Icon = Icons[item.iconName] || Icons.Cloud;
            return (
              <div key={index} className="flex items-center justify-between py-4 border-b border-[rgba(255,255,255,0.05)] last:border-0 hover:bg-white/[0.02] rounded-xl px-4 transition-colors">
                
                {/* Day Info */}
                <div className="flex flex-col w-[120px]">
                  <span className="text-[16px] font-[600] text-white">{item.day}</span>
                  {item.date && <span className="text-[13px] text-white/60 font-[500]">{item.date}</span>}
                </div>

                {/* Precip */}
                <div className="flex items-center gap-1.5 w-[80px]">
                  {item.precip > 20 && (
                    <>
                      <Icons.Droplets size={14} className="text-[#3DA9FF]" strokeWidth={2} />
                      <span className="text-[14px] text-[#3DA9FF] font-[600]">{item.precip}%</span>
                    </>
                  )}
                </div>

                {/* Icon */}
                <div className="w-[60px] flex justify-center">
                  <Icon size={28} className={item.color} strokeWidth={1.5} />
                </div>

                {/* Temp Bar */}
                <div className="flex items-center gap-4 flex-1 justify-end max-w-[200px]">
                  <span className="text-[16px] text-white/60 font-[500] w-[30px] text-right">{item.min}°</span>
                  <div className="flex-1 h-[6px] bg-white/10 rounded-full overflow-hidden relative min-w-[80px]">
                    <div 
                      className="absolute top-0 bottom-0 rounded-full"
                      style={{
                        left: '20%', 
                        right: '10%',
                        background: 'linear-gradient(90deg, #3DA9FF 0%, #FF8A3D 100%)'
                      }}
                    />
                  </div>
                  <span className="text-[16px] text-white font-[600] w-[30px]">{item.max}°</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
