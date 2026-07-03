import React from 'react';
import useWeatherStore from '../store/useWeatherStore';
import { Clock, Thermometer, Droplets, Wind, Sun } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { getWeatherIconProps } from '../utils/weatherUtils';
import * as Icons from 'lucide-react';

export default function HourlyForecastDetails() {
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

  // Get next 24 hours starting from next hour
  const now = new Date();
  const startIndex = weatherData.hourly.findIndex(h => new Date(h.time) >= now);
  const validStartIndex = startIndex !== -1 ? startIndex : 0;
  const next24h = weatherData.hourly.slice(validStartIndex, validStartIndex + 24).map((hour, i) => {
    const d = new Date(hour.time);
    const timeString = i === 0 ? 'Now' : d.toLocaleTimeString('en-US', { hour: 'numeric' });
    const { iconName, color } = getWeatherIconProps(hour.weatherCode);
    return {
      time: timeString,
      temp: Math.round(hour.temp),
      feelsLike: Math.round(hour.feelsLike),
      humidity: Math.round(hour.humidity),
      wind: Math.round(hour.windSpeed),
      rain: Math.round(hour.precipitationProbability),
      uv: Math.round(hour.uvIndex),
      iconName,
      color,
      active: i === 0
    };
  });

  // Calculate Insights
  const maxTemp = Math.max(...next24h.map(h => h.temp));
  const minTemp = Math.min(...next24h.map(h => h.temp));
  const maxTempHour = next24h.find(h => h.temp === maxTemp)?.time;
  const minTempHour = next24h.find(h => h.temp === minTemp)?.time;
  
  const maxRain = Math.max(...next24h.map(h => h.rain));
  const maxRainHour = next24h.find(h => h.rain === maxRain)?.time;

  const maxWind = Math.max(...next24h.map(h => h.wind));
  const maxWindHour = next24h.find(h => h.wind === maxWind)?.time;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0B1525] border border-[rgba(255,255,255,0.1)] p-3 rounded-lg shadow-xl">
          <p className="text-white/60 text-[12px] mb-1">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-[14px] font-[600]" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col w-full max-w-[1440px] mx-auto px-6 md:px-10 mt-12 pb-12 flex-1">
      
      {/* Hero Section */}
      <div className="flex flex-col gap-2 mb-10">
        <h1 className="text-[36px] font-[800] text-white tracking-tight drop-shadow-sm flex items-center gap-3">
          <Clock size={36} className="text-[#FACC15]" />
          24 Hour Forecast Analytics
        </h1>
        <p className="text-[16px] text-white/70 font-medium">
          Detailed weather intelligence for the next 24 hours in {location?.name || 'your location'}.
        </p>
      </div>

      <div className="flex flex-col gap-6">

        {/* Insights Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[rgba(10,15,25,0.55)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.04)] rounded-xl p-4 flex flex-col">
            <span className="text-[#FF8A3D] text-[12px] font-[700] uppercase mb-1">Warmest Hour</span>
            <span className="text-white text-[18px] font-[700]">{maxTempHour} ({maxTemp}°)</span>
          </div>
          <div className="bg-[rgba(10,15,25,0.55)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.04)] rounded-xl p-4 flex flex-col">
            <span className="text-[#3DA9FF] text-[12px] font-[700] uppercase mb-1">Coolest Hour</span>
            <span className="text-white text-[18px] font-[700]">{minTempHour} ({minTemp}°)</span>
          </div>
          <div className="bg-[rgba(10,15,25,0.55)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.04)] rounded-xl p-4 flex flex-col">
            <span className="text-[#A7B2C7] text-[12px] font-[700] uppercase mb-1">Highest Rain Prob.</span>
            <span className="text-white text-[18px] font-[700]">{maxRainHour} ({maxRain}%)</span>
          </div>
          <div className="bg-[rgba(10,15,25,0.55)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.04)] rounded-xl p-4 flex flex-col">
            <span className="text-[#10B981] text-[12px] font-[700] uppercase mb-1">Strongest Winds</span>
            <span className="text-white text-[18px] font-[700]">{maxWindHour} ({maxWind} km/h)</span>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Temperature Trend */}
          <div className="bg-[rgba(10,15,25,0.55)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.04)] rounded-[24px] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.25)] flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-[10%] w-[200px] h-[200px] bg-[rgba(255,138,61,0.05)] blur-[60px] pointer-events-none rounded-full" />
            <h3 className="text-[16px] font-[700] text-white tracking-tight mb-6 flex items-center gap-2">
              <Thermometer size={18} className="text-[#FF8A3D]" /> Temperature Trend
            </h3>
            <div className="w-full h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={next24h} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#A7B2C7', fontSize: 12 }} minTickGap={30} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#A7B2C7', fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }} />
                  <Line type="monotone" dataKey="temp" name="Temp (°C)" stroke="#FF8A3D" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: '#FF8A3D', stroke: '#fff', strokeWidth: 2 }} />
                  <Line type="monotone" dataKey="feelsLike" name="Feels Like (°C)" stroke="#FACC15" strokeWidth={2} strokeDasharray="4 4" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Precipitation Analysis */}
          <div className="bg-[rgba(10,15,25,0.55)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.04)] rounded-[24px] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.25)] flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-[10%] w-[200px] h-[200px] bg-[rgba(61,169,255,0.05)] blur-[60px] pointer-events-none rounded-full" />
            <h3 className="text-[16px] font-[700] text-white tracking-tight mb-6 flex items-center gap-2">
              <Droplets size={18} className="text-[#3DA9FF]" /> Precipitation Analysis
            </h3>
            <div className="w-full h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={next24h} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#A7B2C7', fontSize: 12 }} minTickGap={30} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#A7B2C7', fontSize: 12 }} domain={[0, 100]} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                  <Bar dataKey="rain" name="Rain Prob. (%)" fill="#3DA9FF" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Wind Analysis */}
          <div className="bg-[rgba(10,15,25,0.55)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.04)] rounded-[24px] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.25)] flex flex-col relative overflow-hidden lg:col-span-2">
            <div className="absolute top-0 left-[20%] w-[300px] h-[200px] bg-[rgba(16,185,129,0.05)] blur-[80px] pointer-events-none rounded-full" />
            <h3 className="text-[16px] font-[700] text-white tracking-tight mb-6 flex items-center gap-2">
              <Wind size={18} className="text-[#10B981]" /> Wind Analysis
            </h3>
            <div className="w-full h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={next24h} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="windGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#A7B2C7', fontSize: 12 }} minTickGap={30} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#A7B2C7', fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }} />
                  <Area type="monotone" dataKey="wind" name="Wind (km/h)" stroke="#10B981" fillOpacity={1} fill="url(#windGradient)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Data Grid */}
        <div className="bg-[rgba(10,15,25,0.55)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.04)] rounded-[24px] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.25)] flex flex-col mt-4 overflow-x-auto">
          <h3 className="text-[16px] font-[700] text-white tracking-tight mb-6">Hourly Data Grid</h3>
          <div className="min-w-[800px]">
            <div className="grid grid-cols-7 gap-4 border-b border-[rgba(255,255,255,0.1)] pb-3 mb-2 text-[#A7B2C7] font-[600] text-[13px] uppercase tracking-wider px-2">
              <div>Time</div>
              <div>Temp / Feels</div>
              <div>Condition</div>
              <div>Rain %</div>
              <div>Wind</div>
              <div>Humidity</div>
              <div>UV Index</div>
            </div>
            
            {next24h.map((hour, idx) => {
              const Icon = Icons[hour.iconName] || Icons.Cloud;
              return (
                <div key={idx} className="grid grid-cols-7 gap-4 py-3 px-2 border-b border-[rgba(255,255,255,0.03)] last:border-0 hover:bg-white/[0.02] rounded-lg transition-colors items-center text-white font-[500] text-[14px]">
                  <div className={hour.active ? "text-[#FF8A3D] font-[700]" : ""}>{hour.time}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-[16px] font-[700]">{hour.temp}°</span>
                    <span className="text-[13px] text-white/50">{hour.feelsLike}°</span>
                  </div>
                  <div>
                    <Icon size={20} className={hour.color} />
                  </div>
                  <div className="flex items-center gap-1.5">
                    {hour.rain > 0 && <Droplets size={14} className="text-[#3DA9FF]" />}
                    <span className={hour.rain > 0 ? "text-[#3DA9FF]" : "text-white/40"}>{hour.rain}%</span>
                  </div>
                  <div className="text-[#10B981]">{hour.wind} km/h</div>
                  <div>{hour.humidity}%</div>
                  <div className="flex items-center gap-1.5">
                    {hour.uv > 2 && <Sun size={14} className="text-[#FACC15]" />}
                    <span>{hour.uv}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
