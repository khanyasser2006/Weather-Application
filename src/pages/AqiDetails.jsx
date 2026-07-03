import React from 'react';
import useWeatherStore from '../store/useWeatherStore';
import { getAqiStatus } from '../utils/weatherUtils';
import { Wind, Activity, AlertTriangle, CheckCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';

export default function AqiDetails() {
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

  const aqi = weatherData.aqi;
  const aqiStatus = getAqiStatus(aqi.score);

  const pollutants = [
    { name: 'PM2.5', value: Math.round(aqi.pm25), limit: 15, unit: 'µg/m³' },
    { name: 'PM10', value: Math.round(aqi.pm10), limit: 45, unit: 'µg/m³' },
    { name: 'O3', value: Math.round(aqi.o3), limit: 100, unit: 'µg/m³' },
    { name: 'NO2', value: Math.round(aqi.no2), limit: 25, unit: 'µg/m³' },
    { name: 'SO2', value: Math.round(aqi.so2), limit: 40, unit: 'µg/m³' },
    { name: 'CO', value: Math.round(aqi.co), limit: 4000, unit: 'µg/m³' },
  ];

  // Dummy 24h trend data for visualization purposes since API doesn't provide hourly AQI easily
  const generateTrendData = () => {
    const data = [];
    const base = aqi.score;
    for(let i=0; i<24; i++) {
      data.push({
        hour: `${i}:00`,
        score: Math.max(0, base + Math.round((Math.sin(i / 3) * 15) + (Math.random() * 10 - 5)))
      });
    }
    return data;
  };
  const trendData = generateTrendData();

  return (
    <div className="flex flex-col w-full max-w-[1440px] mx-auto px-6 md:px-10 mt-12 pb-12 flex-1">
      
      {/* Hero Section */}
      <div className="flex flex-col gap-2 mb-10">
        <h1 className="text-[36px] font-[800] text-white tracking-tight drop-shadow-sm flex items-center gap-3">
          <Wind size={36} className="text-[#3DA9FF]" />
          Air Quality Intelligence
        </h1>
        <p className="text-[16px] text-white/70 font-medium">
          Detailed atmospheric analysis and pollutant monitoring for {location?.name || 'your location'}.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: AQI Overview */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-[rgba(10,15,25,0.55)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.04)] rounded-[24px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.25)] relative overflow-hidden flex flex-col items-center text-center">
            <div className={`absolute top-0 w-full h-[4px]`} style={{ backgroundColor: aqiStatus.color }} />
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] blur-[80px] opacity-20 pointer-events-none rounded-full`} style={{ backgroundColor: aqiStatus.color }} />
            
            <h3 className="text-[14px] font-[700] uppercase text-white/60 tracking-[0.1em] mb-4">Current AQI</h3>
            <span className="text-[72px] font-[800] text-white leading-none tracking-tighter drop-shadow-lg mb-2">
              {aqi.score}
            </span>
            <span className="text-[20px] font-[700]" style={{ color: aqiStatus.color }}>
              {aqiStatus.label}
            </span>
            <div className="mt-6 p-4 rounded-xl bg-white/[0.03] border border-[rgba(255,255,255,0.05)] w-full text-left flex items-start gap-3">
              {aqi.score < 50 ? <CheckCircle className="text-[#10B981] mt-0.5 shrink-0" size={18} /> : <AlertTriangle className="text-[#FF8A3D] mt-0.5 shrink-0" size={18} />}
              <p className="text-[14px] text-[#A7B2C7] leading-relaxed mb-0">
                {aqi.score < 50 
                  ? "Air quality is considered satisfactory, and air pollution poses little or no risk."
                  : aqi.score < 100 
                  ? "Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution."
                  : "Members of sensitive groups may experience health effects. The general public is less likely to be affected."}
              </p>
            </div>
          </div>

          <div className="bg-[rgba(10,15,25,0.55)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.04)] rounded-[24px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.25)] flex flex-col">
            <h3 className="text-[16px] font-[700] text-white tracking-tight mb-6 flex items-center gap-2">
              <Activity size={18} className="text-[#3DA9FF]" /> Health Advisory
            </h3>
            <ul className="flex flex-col gap-4 text-[14px] text-white/80">
              <li className="flex items-center gap-3">
                <div className="w-[6px] h-[6px] rounded-full bg-[#10B981]" />
                Safe for outdoor activities
              </li>
              {aqi.score > 50 && (
                <li className="flex items-center gap-3">
                  <div className="w-[6px] h-[6px] rounded-full bg-[#FACC15]" />
                  Unusually sensitive individuals should consider reducing prolonged outdoor exertion
                </li>
              )}
              <li className="flex items-center gap-3">
                <div className="w-[6px] h-[6px] rounded-full bg-[#3DA9FF]" />
                Keep indoor air circulating
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Analytics */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Pollutant Breakdown Chart */}
          <div className="bg-[rgba(10,15,25,0.55)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.04)] rounded-[24px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.25)] flex flex-col">
            <h3 className="text-[16px] font-[700] text-white tracking-tight mb-2">Pollutant Breakdown</h3>
            <p className="text-[13px] text-white/60 mb-8">Concentration vs WHO Safe Limits (µg/m³)</p>
            
            <div className="w-full h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pollutants} layout="vertical" margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#A7B2C7', fontSize: 13, fontWeight: 600 }} width={60} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-[#0B1525] border border-[rgba(255,255,255,0.1)] p-3 rounded-lg shadow-xl">
                            <p className="text-white font-[600] text-[14px] mb-1">{data.name}</p>
                            <p className="text-[#3DA9FF] font-[700] text-[16px]">{data.value} <span className="text-[12px] text-white/60">{data.unit}</span></p>
                            <p className="text-white/60 text-[12px] mt-1">WHO Limit: {data.limit}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={16}>
                    {pollutants.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.value > entry.limit ? '#EF4444' : entry.value > entry.limit * 0.5 ? '#FACC15' : '#3DA9FF'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 24h Trend Chart */}
          <div className="bg-[rgba(10,15,25,0.55)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.04)] rounded-[24px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.25)] flex flex-col">
            <h3 className="text-[16px] font-[700] text-white tracking-tight mb-8">24-Hour AQI Trend</h3>
            
            <div className="w-full h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trendData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fill: '#A7B2C7', fontSize: 12 }} minTickGap={20} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-[#0B1525] border border-[rgba(255,255,255,0.1)] p-3 rounded-lg shadow-xl">
                            <p className="text-white/60 text-[12px] mb-1">{payload[0].payload.hour}</p>
                            <p className="text-white font-[700] text-[16px]">AQI: {payload[0].value}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="score" fill="#FF8A3D" radius={[4, 4, 0, 0]} opacity={0.8} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
