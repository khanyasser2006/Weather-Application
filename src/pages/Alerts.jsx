import React from 'react';
import useWeatherStore from '../store/useWeatherStore';
import { AlertTriangle, CheckCircle } from 'lucide-react';

export default function Alerts() {
  const weatherData = useWeatherStore(state => state.weatherData);
  const location = useWeatherStore(state => state.location);
  const isLoading = useWeatherStore(state => state.isLoading);

  if (isLoading || !weatherData) {
    return (
      <div className="flex flex-col w-full max-w-[1440px] mx-auto px-6 md:px-10 mt-12 pb-12 flex-1">
        <div className="w-full h-[300px] bg-[rgba(10,15,25,0.55)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.04)] rounded-[24px] animate-pulse" />
      </div>
    );
  }

  const alerts = weatherData.alerts || [];

  return (
    <div className="flex flex-col w-full max-w-[1440px] mx-auto px-6 md:px-10 mt-12 pb-12 flex-1">
      <div className="flex flex-col gap-2 mb-10">
        <h1 className="text-[36px] font-[800] text-white tracking-tight drop-shadow-sm">
          Weather Alerts
        </h1>
        <p className="text-[16px] text-white/70 font-medium">
          Active severe weather warnings for {location?.name || 'your location'}.
        </p>
      </div>

      {alerts.length === 0 ? (
        <div className="w-full max-w-4xl bg-[rgba(10,15,25,0.55)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.04)] rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.25)] border-t-[rgba(0,228,0,0.25)] p-12 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#00E400] blur-[120px] rounded-full pointer-events-none opacity-10" />
          <CheckCircle size={64} className="text-[#00E400] mb-6 drop-shadow-[0_0_15px_rgba(0,228,0,0.5)]" />
          <h2 className="text-[24px] font-[700] text-white tracking-tight mb-2">No Active Alerts</h2>
          <p className="text-[16px] text-white/60 font-[500] max-w-md">
            There are currently no severe weather warnings or advisories for your area. Conditions are safe.
          </p>
        </div>
      ) : (
        <div className="w-full max-w-4xl flex flex-col gap-6">
          {alerts.map((alert, index) => (
            <div key={index} className="bg-[rgba(255,0,0,0.05)] backdrop-blur-[12px] border border-[rgba(255,0,0,0.2)] rounded-[24px] p-8 shadow-[0_20px_50px_rgba(255,0,0,0.1)] border-t-[rgba(255,0,0,0.5)] relative overflow-hidden">
               <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#FF0000] blur-[100px] rounded-full pointer-events-none opacity-20" />
               <div className="flex items-start gap-6 relative z-10">
                  <div className="w-[48px] h-[48px] rounded-full bg-red-500/20 flex items-center justify-center shrink-0 border border-red-500/30">
                    <AlertTriangle size={24} className="text-red-500" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-[20px] font-[700] text-white mb-1">{alert.title || 'Severe Weather Warning'}</h3>
                    <span className="text-[14px] text-red-300 font-[600] mb-4 uppercase tracking-wider">{alert.severity || 'Urgent'}</span>
                    <p className="text-[15px] text-white/80 leading-relaxed">
                      {alert.description || 'Hazardous weather conditions are expected in your area. Please take necessary precautions.'}
                    </p>
                  </div>
               </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
