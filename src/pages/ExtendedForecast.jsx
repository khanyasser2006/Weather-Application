import React from 'react';
import useWeatherStore from '../store/useWeatherStore';
import { CalendarDays, Droplets, Sun, Wind, Thermometer } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { getWeatherIconProps, getShortDayName } from '../utils/weatherUtils';
import * as Icons from 'lucide-react';

export default function ExtendedForecast() {
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

  // Generate 7-10 day data
  const extendedData = weatherData.daily.slice(0, 7).map((day, i) => {
    const d = new Date(day.date);
    const dayName = i === 0 ? 'Today' : getShortDayName(d.getDay());
    const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const { iconName, color } = getWeatherIconProps(day.weatherCode);
    
    // Parse sunrise/sunset to just time
    const sunriseStr = day.sunrise ? new Date(day.sunrise).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) : '--:--';
    const sunsetStr = day.sunset ? new Date(day.sunset).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) : '--:--';

    return {
      day: dayName,
      date: dateStr,
      fullLabel: `${dayName}, ${dateStr}`,
      maxTemp: Math.round(day.tempMax),
      minTemp: Math.round(day.tempMin),
      rain: Math.round(day.precipitationProbability || 0),
      uv: Math.round(day.uvIndexMax || 0),
      wind: Math.round(day.windSpeedMax || 0),
      sunrise: sunriseStr,
      sunset: sunsetStr,
      iconName,
      color
    };
  });

  // Calculate Insights
  const maxWeeklyTemp = Math.max(...extendedData.map(d => d.maxTemp));
  const minWeeklyTemp = Math.min(...extendedData.map(d => d.minTemp));
  const warmestDay = extendedData.find(d => d.maxTemp === maxWeeklyTemp)?.day;
  const coolestDay = extendedData.find(d => d.minTemp === minWeeklyTemp)?.day;
  
  const maxRain = Math.max(...extendedData.map(d => d.rain));
  const maxRainDay = extendedData.find(d => d.rain === maxRain)?.day;

  const maxWind = Math.max(...extendedData.map(d => d.wind));
  const maxWindDay = extendedData.find(d => d.wind === maxWind)?.day;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#0B1525] border border-[rgba(255,255,255,0.1)] p-3 rounded-lg shadow-xl min-w-[120px]">
          <p className="text-white/60 text-[12px] mb-2">{data.fullLabel}</p>
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
          <CalendarDays size={36} className="text-[#FF8A3D]" />
          Extended Forecast Analytics
        </h1>
        <p className="text-[16px] text-white/70 font-medium">
          Deep weather outlook for the upcoming days in {location?.name || 'your location'}.
        </p>
      </div>

      <div className="flex flex-col gap-6">

        {/* Insights Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[rgba(10,15,25,0.55)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.04)] rounded-xl p-4 flex flex-col">
            <span className="text-[#FF8A3D] text-[12px] font-[700] uppercase mb-1">Warmest Day</span>
            <span className="text-white text-[18px] font-[700]">{warmestDay} ({maxWeeklyTemp}°)</span>
          </div>
          <div className="bg-[rgba(10,15,25,0.55)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.04)] rounded-xl p-4 flex flex-col">
            <span className="text-[#3DA9FF] text-[12px] font-[700] uppercase mb-1">Coolest Day</span>
            <span className="text-white text-[18px] font-[700]">{coolestDay} ({minWeeklyTemp}°)</span>
          </div>
          <div className="bg-[rgba(10,15,25,0.55)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.04)] rounded-xl p-4 flex flex-col">
            <span className="text-[#A7B2C7] text-[12px] font-[700] uppercase mb-1">Highest Rain Prob.</span>
            <span className="text-white text-[18px] font-[700]">{maxRainDay} ({maxRain}%)</span>
          </div>
          <div className="bg-[rgba(10,15,25,0.55)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.04)] rounded-xl p-4 flex flex-col">
            <span className="text-[#10B981] text-[12px] font-[700] uppercase mb-1">Strongest Winds</span>
            <span className="text-white text-[18px] font-[700]">{maxWindDay} ({maxWind} km/h)</span>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Temperature Trend */}
          <div className="bg-[rgba(10,15,25,0.55)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.04)] rounded-[24px] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.25)] flex flex-col relative overflow-hidden lg:col-span-2">
            <div className="absolute top-0 right-[10%] w-[300px] h-[300px] bg-[rgba(255,138,61,0.05)] blur-[80px] pointer-events-none rounded-full" />
            <h3 className="text-[16px] font-[700] text-white tracking-tight mb-6 flex items-center gap-2">
              <Thermometer size={18} className="text-[#FF8A3D]" /> Weekly Temperature Trend
            </h3>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={extendedData} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#A7B2C7', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#A7B2C7', fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }} />
                  <Line type="monotone" dataKey="maxTemp" name="High (°C)" stroke="#FF8A3D" strokeWidth={4} dot={{ r: 4, fill: '#FF8A3D' }} activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }} />
                  <Line type="monotone" dataKey="minTemp" name="Low (°C)" stroke="#3DA9FF" strokeWidth={4} dot={{ r: 4, fill: '#3DA9FF' }} activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Rain Trend */}
          <div className="bg-[rgba(10,15,25,0.55)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.04)] rounded-[24px] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.25)] flex flex-col relative overflow-hidden">
            <h3 className="text-[16px] font-[700] text-white tracking-tight mb-6 flex items-center gap-2">
              <Droplets size={18} className="text-[#3DA9FF]" /> Rain Probability Trend
            </h3>
            <div className="w-full h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={extendedData} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#A7B2C7', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#A7B2C7', fontSize: 12 }} domain={[0, 100]} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                  <Bar dataKey="rain" name="Rain (%)" fill="#3DA9FF" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* UV Trend */}
          <div className="bg-[rgba(10,15,25,0.55)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.04)] rounded-[24px] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.25)] flex flex-col relative overflow-hidden">
            <h3 className="text-[16px] font-[700] text-white tracking-tight mb-6 flex items-center gap-2">
              <Sun size={18} className="text-[#FACC15]" /> UV Index Trend
            </h3>
            <div className="w-full h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={extendedData} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="uvGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FACC15" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#FACC15" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#A7B2C7', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#A7B2C7', fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }} />
                  <Area type="monotone" dataKey="uv" name="UV Index" stroke="#FACC15" fillOpacity={1} fill="url(#uvGradient)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Forecast Grid */}
        <div className="bg-[rgba(10,15,25,0.55)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.04)] rounded-[24px] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.25)] flex flex-col mt-4 overflow-x-auto">
          <h3 className="text-[16px] font-[700] text-white tracking-tight mb-6">Daily Forecast Grid</h3>
          <div className="min-w-[900px]">
            <div className="grid grid-cols-8 gap-4 border-b border-[rgba(255,255,255,0.1)] pb-3 mb-2 text-[#A7B2C7] font-[600] text-[13px] uppercase tracking-wider px-2">
              <div>Day</div>
              <div>Condition</div>
              <div>High / Low</div>
              <div>Rain %</div>
              <div>Wind</div>
              <div>UV Index</div>
              <div>Sunrise</div>
              <div>Sunset</div>
            </div>
            
            {extendedData.map((day, idx) => {
              const Icon = Icons[day.iconName] || Icons.Cloud;
              return (
                <div key={idx} className="grid grid-cols-8 gap-4 py-4 px-2 border-b border-[rgba(255,255,255,0.03)] last:border-0 hover:bg-white/[0.02] rounded-lg transition-colors items-center text-white font-[500] text-[14px]">
                  <div className="flex flex-col">
                    <span className={idx === 0 ? "text-[#FF8A3D] font-[700]" : "font-[700]"}>{day.day}</span>
                    <span className="text-[12px] text-white/50">{day.date}</span>
                  </div>
                  <div>
                    <Icon size={24} className={day.color} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[16px] font-[700]">{day.maxTemp}°</span>
                    <span className="text-[14px] text-white/50">{day.minTemp}°</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {day.rain > 0 && <Droplets size={14} className="text-[#3DA9FF]" />}
                    <span className={day.rain > 0 ? "text-[#3DA9FF]" : "text-white/40"}>{day.rain}%</span>
                  </div>
                  <div className="text-[#10B981]">{day.wind} km/h</div>
                  <div className="flex items-center gap-1.5">
                    {day.uv > 2 && <Sun size={14} className="text-[#FACC15]" />}
                    <span>{day.uv}</span>
                  </div>
                  <div className="text-white/80">{day.sunrise}</div>
                  <div className="text-white/80">{day.sunset}</div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
