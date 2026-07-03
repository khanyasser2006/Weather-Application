import React from 'react';
import useWeatherStore from '../store/useWeatherStore';
import { Wind } from 'lucide-react';

export default function AQIPage() {
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

  const { aqi } = weatherData;
  const aqiScore = aqi?.score || 0;
  
  const getAqiColor = (score) => {
    if (score <= 50) return '#00E400'; // Good
    if (score <= 100) return '#FFFF00'; // Moderate
    if (score <= 150) return '#FF7E00'; // Unhealthy for Sensitive Groups
    if (score <= 200) return '#FF0000'; // Unhealthy
    if (score <= 300) return '#8F3F97'; // Very Unhealthy
    return '#7E0023'; // Hazardous
  };

  const getAqiLabel = (score) => {
    if (score <= 50) return 'Good';
    if (score <= 100) return 'Moderate';
    if (score <= 150) return 'Sensitive';
    if (score <= 200) return 'Unhealthy';
    if (score <= 300) return 'Very Unhealthy';
    return 'Hazardous';
  };

  const color = getAqiColor(aqiScore);
  const label = getAqiLabel(aqiScore);

  const pollutants = [
    { name: 'PM2.5', value: aqi?.pm25, unit: 'µg/m³', limit: 12 },
    { name: 'PM10', value: aqi?.pm10, unit: 'µg/m³', limit: 54 },
    { name: 'O₃ (Ozone)', value: aqi?.o3, unit: 'µg/m³', limit: 70 },
    { name: 'NO₂', value: aqi?.no2, unit: 'µg/m³', limit: 53 },
  ];

  return (
    <div className="flex flex-col w-full max-w-[1440px] mx-auto px-6 md:px-10 mt-12 pb-12 flex-1">
      <div className="flex flex-col gap-2 mb-10">
        <h1 className="text-[36px] font-[800] text-white tracking-tight drop-shadow-sm">
          Air Quality Index
        </h1>
        <p className="text-[16px] text-white/70 font-medium">
          Current air quality metrics for {location?.name || 'your location'}.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-5xl">
        {/* Main AQI Score Card */}
        <div className="bg-[rgba(10,15,25,0.55)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.04)] rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.25)] border-t-[rgba(255,138,61,0.25)] p-10 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[6px]" style={{ backgroundColor: color }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] blur-[100px] rounded-full pointer-events-none opacity-20" style={{ backgroundColor: color }} />
          
          <Wind size={48} className="text-white/50 mb-6 z-10" />
          <span className="text-[16px] text-white/60 font-[600] uppercase tracking-wider mb-2 z-10">US AQI</span>
          <span className="text-[120px] font-[800] text-white leading-none tracking-tighter mb-4 z-10" style={{ textShadow: `0 0 40px ${color}80` }}>
            {aqiScore}
          </span>
          <div className="px-6 py-2 rounded-full z-10" style={{ backgroundColor: `${color}30`, border: `1px solid ${color}50` }}>
            <span className="text-[20px] font-[700]" style={{ color: color }}>{label}</span>
          </div>
        </div>

        {/* Pollutants Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {pollutants.map((p, i) => {
            const isHigh = p.value > p.limit;
            return (
              <div key={i} className="bg-[rgba(10,15,25,0.55)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.04)] rounded-[24px] p-6 flex flex-col justify-between relative overflow-hidden">
                {isHigh && <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/20 blur-xl rounded-full" />}
                
                <span className="text-[15px] font-[600] text-white/70 mb-4">{p.name}</span>
                <div className="flex items-end gap-2">
                  <span className="text-[40px] font-[700] text-white leading-none">{p.value ? Math.round(p.value) : '--'}</span>
                  <span className="text-[14px] text-white/50 font-[500] mb-1">{p.unit}</span>
                </div>
                
                <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                  <span className="text-[12px] text-white/40">WHO Limit: {p.limit}</span>
                  <span className={`text-[12px] font-[600] ${isHigh ? 'text-red-400' : 'text-green-400'}`}>
                    {p.value ? (isHigh ? 'Exceeds limit' : 'Good') : 'N/A'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
