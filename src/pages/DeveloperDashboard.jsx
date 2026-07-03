import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Server, Cloud, MonitorSmartphone, Map, Database, CheckCircle, Copy, RefreshCw, Code, Layers } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import useWeatherStore from '../store/useWeatherStore';

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function DeveloperDashboard() {
  const weatherData = useWeatherStore(state => state.weatherData);
  const metrics = useWeatherStore(state => state.metrics);
  const isLoading = useWeatherStore(state => state.isLoading);
  const fetchWeather = useWeatherStore(state => state.fetchWeather);
  const location = useWeatherStore(state => state.location);
  
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('full');

  const handleCopy = () => {
    let payload = weatherData;
    if (activeTab === 'current') payload = weatherData?.current;
    if (activeTab === 'daily') payload = weatherData?.daily;
    if (activeTab === 'hourly') payload = weatherData?.hourly;
    
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRefresh = () => {
    if (location) {
      fetchWeather(location.lat, location.lon);
    }
  };

  const backendLatency = metrics.lastLatency;
  // Use real metrics when possible. 
  // We don't have separate Open-Meteo or Leaflet metrics, so we omit fake ones per user request.
  // Instead, we just display the tracked latency for our whole fetch pipeline.

  const successRate = metrics.totalRequests > 0 
    ? Math.round((metrics.successfulRequests / metrics.totalRequests) * 100) 
    : 100;

  return (
    <div className="flex flex-col w-full max-w-[1440px] mx-auto px-6 md:px-10 mt-12 pb-24">
      
      {/* HERO SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-16 flex flex-col items-center text-center w-full"
      >
        <div className="inline-flex items-center justify-center p-3 bg-[#FF8A3D]/10 rounded-2xl mb-6 shadow-[0_0_30px_rgba(255,138,61,0.2)]">
          <Activity size={32} className="text-[#FF8A3D]" />
        </div>
        <h1 className="text-[40px] md:text-[54px] font-[800] text-white tracking-tight drop-shadow-sm mb-4 leading-tight">
          Developer Dashboard
        </h1>
        <p className="text-[18px] text-[#A7B2C7] font-medium leading-[1.6] max-w-[600px] mb-12">
          Live monitoring, architecture visualization,<br/>and weather intelligence diagnostics.
        </p>

        {/* Hero Stack Chain */}
        <div className="flex flex-col md:flex-row items-center gap-4 text-[14px] font-[600] text-[#A7B2C7]">
          <div className="flex items-center gap-2 bg-[rgba(255,255,255,0.03)] px-5 py-2.5 rounded-full border border-[rgba(255,255,255,0.06)] shadow-sm">
            <span className="text-white">React + Vite</span>
          </div>
          <span className="text-[#FF8A3D] font-bold hidden md:block">&darr;</span>
          <span className="text-[#FF8A3D] font-bold block md:hidden">&darr;</span>
          
          <div className="flex items-center gap-2 bg-[rgba(255,255,255,0.03)] px-5 py-2.5 rounded-full border border-[rgba(255,255,255,0.06)] shadow-sm">
            <span className="text-white">ASP.NET Core</span>
          </div>
          <span className="text-[#FF8A3D] font-bold hidden md:block">&darr;</span>
          <span className="text-[#FF8A3D] font-bold block md:hidden">&darr;</span>
          
          <div className="flex items-center gap-2 bg-[rgba(255,255,255,0.03)] px-5 py-2.5 rounded-full border border-[rgba(255,255,255,0.06)] shadow-sm">
            <span className="text-white">Open-Meteo</span>
          </div>
          <span className="text-[#FF8A3D] font-bold hidden md:block">&darr;</span>
          <span className="text-[#FF8A3D] font-bold block md:hidden">&darr;</span>

          <div className="flex items-center gap-2 bg-[rgba(255,255,255,0.03)] px-5 py-2.5 rounded-full border border-[rgba(255,255,255,0.06)] shadow-sm">
            <span className="text-white">Leaflet</span>
          </div>
          <span className="text-[#FF8A3D] font-bold hidden md:block">&darr;</span>
          <span className="text-[#FF8A3D] font-bold block md:hidden">&darr;</span>

          <div className="flex items-center gap-2 bg-[rgba(255,255,255,0.03)] px-5 py-2.5 rounded-full border border-[rgba(255,255,255,0.06)] shadow-sm">
            <span className="text-white">Recharts</span>
          </div>
        </div>
      </motion.div>

      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col gap-8 w-full">

        {/* SYSTEM STATUS */}
        <section>
          <h2 className="text-[18px] font-[700] text-white tracking-wide uppercase mb-6 flex items-center gap-2">
            <Activity size={20} className="text-[#FF8A3D]" />
            System Status
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatusCard 
              title="Frontend Client" 
              icon={MonitorSmartphone} 
              status="ONLINE" 
              latency={`Render Ready`}
              isHealthy={true}
            />
            <StatusCard 
              title="Backend & API" 
              icon={Server} 
              status={metrics.lastLatency > 0 ? "ONLINE" : "STANDBY"} 
              latency={`${backendLatency} ms`}
              isHealthy={metrics.lastLatency > 0 && metrics.failedRequests === 0}
            />
            <StatusCard 
              title="Weather Provider" 
              icon={Cloud} 
              status="ONLINE" 
              latency={`Active`}
              isHealthy={true}
            />
            <StatusCard 
              title="Location Services" 
              icon={Map} 
              status={location ? "ONLINE" : "PENDING"} 
              latency="Local Storage"
              isHealthy={!!location}
            />
          </div>
        </section>

        {/* DATA FLOW VISUALIZATION */}
        <section className="mt-8">
          <h2 className="text-[18px] font-[700] text-white tracking-wide uppercase mb-6 flex items-center gap-2">
            <Database size={20} className="text-[#FF8A3D]" />
            Live Data Pipeline
          </h2>
          <div className="w-full bg-[rgba(10,15,25,0.55)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.06)] rounded-[24px] p-8 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.25)] overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,138,61,0.05)_0%,transparent_70%)] pointer-events-none" />
            
            <div className="flex flex-col md:flex-row justify-between items-center relative z-10 w-full max-w-[900px] mx-auto gap-8 md:gap-0">
              
              <FlowNode title="Open-Meteo" subtitle="Data Provider" icon={Cloud} delay={0} />
              
              {/* Connecting Line 1 */}
              <div className="hidden md:block flex-1 h-[2px] bg-white/10 relative overflow-hidden mx-4">
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-[#FF8A3D] to-transparent shadow-[0_0_10px_#FF8A3D]"
                />
              </div>
              <div className="block md:hidden h-12 w-[2px] bg-white/10 relative overflow-hidden my-2">
                <motion.div 
                  initial={{ y: "-100%" }}
                  animate={{ y: "200%" }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-1/3 bg-gradient-to-b from-transparent via-[#FF8A3D] to-transparent shadow-[0_0_10px_#FF8A3D]"
                />
              </div>

              <FlowNode title="ASP.NET Core" subtitle="Weather API" icon={Server} delay={0.2} active={isLoading} />

              {/* Connecting Line 2 */}
              <div className="hidden md:block flex-1 h-[2px] bg-white/10 relative overflow-hidden mx-4">
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{ duration: 1.5, delay: 0.5, repeat: Infinity, ease: "linear" }}
                  className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-[#FF8A3D] to-transparent shadow-[0_0_10px_#FF8A3D]"
                />
              </div>
              <div className="block md:hidden h-12 w-[2px] bg-white/10 relative overflow-hidden my-2">
                <motion.div 
                  initial={{ y: "-100%" }}
                  animate={{ y: "200%" }}
                  transition={{ duration: 1.5, delay: 0.5, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-1/3 bg-gradient-to-b from-transparent via-[#FF8A3D] to-transparent shadow-[0_0_10px_#FF8A3D]"
                />
              </div>

              <FlowNode title="Zustand Store" subtitle="Client State" icon={Database} delay={0.4} />
              
              {/* Connecting Line 3 */}
              <div className="hidden md:block flex-1 h-[2px] bg-white/10 relative overflow-hidden mx-4">
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{ duration: 1.5, delay: 1.0, repeat: Infinity, ease: "linear" }}
                  className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-[#FF8A3D] to-transparent shadow-[0_0_10px_#FF8A3D]"
                />
              </div>
              <div className="block md:hidden h-12 w-[2px] bg-white/10 relative overflow-hidden my-2">
                <motion.div 
                  initial={{ y: "-100%" }}
                  animate={{ y: "200%" }}
                  transition={{ duration: 1.5, delay: 1.0, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-1/3 bg-gradient-to-b from-transparent via-[#FF8A3D] to-transparent shadow-[0_0_10px_#FF8A3D]"
                />
              </div>

              <FlowNode title="React UI" subtitle="Components" icon={MonitorSmartphone} delay={0.6} />

            </div>
          </div>
        </section>

        {/* ANALYTICS & INSIGHTS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          
          {/* Request Analytics */}
          <section className="lg:col-span-2">
            <h2 className="text-[18px] font-[700] text-white tracking-wide uppercase mb-6 flex items-center gap-2">
              <Activity size={20} className="text-[#FF8A3D]" />
              API Latency History
            </h2>
            <div className="w-full bg-[rgba(10,15,25,0.55)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.06)] rounded-[24px] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.25)] h-[340px]">
              {metrics.history.length < 3 ? (
                <div className="w-full h-[200px] flex flex-col items-center justify-center text-[#A7B2C7] gap-3">
                  <Activity size={24} className="opacity-50" />
                  <span>Collecting latency history... (Needs at least 3 points)</span>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={metrics.history} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FF8A3D" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#FF8A3D" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" stroke="#A7B2C7" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#A7B2C7" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}ms`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'rgba(10,15,25,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                      itemStyle={{ color: '#FF8A3D' }}
                    />
                    <Area type="monotone" dataKey="latency" stroke="#FF8A3D" strokeWidth={3} fillOpacity={1} fill="url(#colorLatency)" isAnimationActive={true} activeDot={{ r: 6 }} dot={{ r: 4 }} />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </section>
          {/* Developer Insights */}
          <section>
            <h2 className="text-[18px] font-[700] text-white tracking-wide uppercase mb-6 flex items-center gap-2">
              <Code size={20} className="text-[#FF8A3D]" />
              Live Metrics
            </h2>
            <div className="flex flex-col gap-4">
              <MetricCard title="Total API Calls" value={metrics.totalRequests} />
              <MetricCard title="Success Rate" value={`${successRate}%`} highlight={successRate === 100} />
              <MetricCard title="Avg Latency" value={`${metrics.history.length > 0 ? Math.round(metrics.history.reduce((a, b) => a + b.latency, 0) / metrics.history.length) : 0} ms`} />
            </div>
            
            {/* TECH STACK PANEL */}
            <h2 className="text-[18px] font-[700] text-white tracking-wide uppercase mt-8 mb-6 flex items-center gap-2">
              <Layers size={20} className="text-[#FF8A3D]" />
              Tech Stack
            </h2>
            <div className="flex flex-col gap-3">
              <StackCard category="Frontend" tools="React, Vite, Framer Motion" />
              <StackCard category="Backend" tools="ASP.NET Core 8" />
              <StackCard category="Data" tools="Open-Meteo API" />
            </div>
          </section>

        </div>

        {/* RAW API VIEWER */}
        <section className="mt-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <h2 className="text-[18px] font-[700] text-white tracking-wide uppercase flex items-center gap-2">
              <Code size={20} className="text-[#FF8A3D]" />
              Raw Payload Inspector
            </h2>
            
            <div className="flex items-center gap-3">
              <div className="flex bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-lg p-1 overflow-x-auto hide-scrollbar max-w-[200px] sm:max-w-none">
                {['full', 'current', 'daily', 'hourly'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 rounded-md text-[13px] font-[600] transition-colors shrink-0 ${
                      activeTab === tab ? 'bg-[#FF8A3D] text-white' : 'text-[#A7B2C7] hover:text-white'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
              <button 
                onClick={handleRefresh}
                disabled={isLoading}
                className="p-2 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-lg text-[#A7B2C7] hover:text-white hover:bg-[rgba(255,255,255,0.1)] transition-colors disabled:opacity-50"
              >
                <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
              </button>
              <button 
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 bg-[rgba(255,138,61,0.1)] border border-[rgba(255,138,61,0.2)] rounded-lg text-[#FF8A3D] hover:bg-[#FF8A3D] hover:text-white transition-colors text-[13px] font-[600] shrink-0"
              >
                {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
                {copied ? 'Copied!' : 'Copy JSON'}
              </button>
            </div>
          </div>

          <div className="w-full bg-[rgba(5,8,15,0.8)] border border-[rgba(255,255,255,0.06)] rounded-[24px] overflow-hidden shadow-[inset_0_2px_20px_rgba(0,0,0,0.5)] h-[500px] relative">
            <div className="absolute top-0 left-0 right-0 h-[40px] bg-[rgba(255,255,255,0.03)] border-b border-[rgba(255,255,255,0.06)] flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
              <div className="w-3 h-3 rounded-full bg-[#FBBF24]" />
              <div className="w-3 h-3 rounded-full bg-[#10B981]" />
              <span className="ml-4 text-[12px] font-mono text-[#A7B2C7]">response.json</span>
            </div>
            <div className="p-6 overflow-auto h-[460px] font-mono text-[13px] text-[#A7B2C7] mt-[40px]">
              {isLoading && !weatherData ? (
                <div className="flex items-center gap-3 text-[#FF8A3D]">
                  <RefreshCw size={16} className="animate-spin" /> Fetching real data...
                </div>
              ) : (
                <pre className="text-[#A7B2C7]">
                  {weatherData ? JSON.stringify(
                    activeTab === 'full' ? weatherData :
                    activeTab === 'current' ? weatherData.current :
                    activeTab === 'daily' ? weatherData.daily :
                    weatherData.hourly,
                  null, 2) : 'No data available'}
                </pre>
              )}
            </div>
          </div>
        </section>

      </motion.div>
    </div>
  );
}

// ----------------------
// Sub Components
// ----------------------

function StatusCard({ title, icon: Icon, status, latency, isHealthy }) {
  return (
    <motion.div variants={staggerItem} className="bg-[rgba(10,15,25,0.55)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.06)] rounded-[20px] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.2)] flex flex-col relative overflow-hidden">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-[rgba(255,255,255,0.03)] rounded-xl border border-[rgba(255,255,255,0.04)]">
          <Icon size={22} className="text-white" />
        </div>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-[700] tracking-wider ${isHealthy ? 'bg-[rgba(16,185,129,0.1)] text-[#10B981] border border-[rgba(16,185,129,0.2)]' : 'bg-[rgba(239,68,68,0.1)] text-[#EF4444] border border-[rgba(239,68,68,0.2)]'}`}>
          <div className={`w-1.5 h-1.5 rounded-full ${isHealthy ? 'bg-[#10B981] shadow-[0_0_8px_#10B981]' : 'bg-[#EF4444] shadow-[0_0_8px_#EF4444] animate-pulse'}`} />
          {status}
        </div>
      </div>
      <h3 className="text-[16px] font-[700] text-white mb-1">{title}</h3>
      <div className="text-[13px] text-[#A7B2C7] font-medium flex items-center justify-between mt-auto pt-4 border-t border-[rgba(255,255,255,0.04)]">
        <span>Response</span>
        <span className="text-white">{latency}</span>
      </div>
    </motion.div>
  );
}

function FlowNode({ title, subtitle, icon: Icon, delay, active }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={`w-full md:w-[180px] shrink-0 flex flex-col items-center p-6 rounded-[20px] border transition-all duration-300 ${active ? 'bg-[rgba(255,138,61,0.1)] border-[#FF8A3D] shadow-[0_0_30px_rgba(255,138,61,0.2)]' : 'bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)]'}`}
    >
      <div className={`w-[60px] h-[60px] rounded-full flex items-center justify-center mb-4 transition-colors ${active ? 'bg-[#FF8A3D] text-white shadow-[0_8px_16px_rgba(255,138,61,0.4)]' : 'bg-[rgba(255,255,255,0.05)] text-[#A7B2C7]'}`}>
        <Icon size={28} />
      </div>
      <h3 className="text-[16px] font-[700] text-white text-center leading-tight">{title}</h3>
      <p className="text-[13px] text-[#A7B2C7] font-medium mt-1 text-center">{subtitle}</p>
    </motion.div>
  );
}

function MetricCard({ title, value, highlight }) {
  return (
    <motion.div variants={staggerItem} className="bg-[rgba(10,15,25,0.55)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.06)] rounded-[16px] px-6 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.2)] flex justify-between items-center">
      <span className="text-[14px] font-[600] text-[#A7B2C7]">{title}</span>
      <span className={`text-[20px] font-[800] tracking-tight ${highlight ? 'text-[#10B981]' : 'text-white'}`}>{value}</span>
    </motion.div>
  );
}

function StackCard({ category, tools }) {
  return (
    <motion.div variants={staggerItem} className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-[16px] px-6 py-4 flex justify-between items-center">
      <span className="text-[14px] font-[500] text-[#A7B2C7]">{category}</span>
      <span className="text-[14px] font-[700] text-white text-right">{tools}</span>
    </motion.div>
  );
}
