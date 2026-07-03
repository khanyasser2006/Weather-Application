import React, { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NewsletterCTA() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubscribe = async () => {
    if (!email || !email.includes('@')) return;
    setStatus('loading');
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5118';
      const res = await fetch(`${baseUrl}/api/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10 mt-8 mb-16 z-20">
      
      {/* Banner Container */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full h-[140px] rounded-[24px] flex items-center justify-between px-10 overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.25)] bg-[rgba(10,15,25,0.55)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.04)] border-t-[rgba(255,138,61,0.25)]"
      >
        {/* Atmospheric Glows - same as HourlyForecast, centered */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,138,61,0.18),transparent_70%)] pointer-events-none z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_50%,rgba(255,138,61,0.35),transparent_50%)] pointer-events-none z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_50%,rgba(255,120,40,0.2),transparent_45%)] pointer-events-none z-0" />
        
        {/* Left Side: Icon & Text Block */}
        <div className="flex items-center gap-8 z-10">
          
          {/* Icon Container with Glow */}
          <div className="relative">
            <div className="absolute inset-0 bg-[#FF8A3D] blur-[20px] opacity-40 rounded-full" />
            <div className="w-[80px] h-[80px] rounded-full bg-[rgba(255,138,61,0.15)] flex items-center justify-center shrink-0 border border-[rgba(255,138,61,0.3)] shadow-[0_0_20px_rgba(255,138,61,0.15)] relative z-10 backdrop-blur-sm">
              <Mail size={36} className="text-[#FF8A3D] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" strokeWidth={1.5} />
            </div>
          </div>

          {/* Text Block */}
          <div className="flex flex-col justify-center">
            <h2 className="text-[26px] font-[700] text-white leading-tight mb-2 tracking-tight drop-shadow-sm">
              Stay Ahead of the Weather
            </h2>
            <p className="text-[16px] text-white/90 leading-relaxed font-medium">
              Get real-time alerts and daily forecasts delivered directly to your inbox.
            </p>
          </div>

        </div>

        {/* Right Side: Newsletter Form */}
        <div className="flex items-center gap-4 z-10">
          
          {/* Input */}
          <input 
            type="email" 
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'loading' || status === 'success'}
            className="h-[52px] w-[320px] rounded-full bg-white/10 backdrop-blur-xl border border-transparent px-6 text-white placeholder-white/50 focus:outline-none focus:bg-white/15 transition-all shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)] disabled:opacity-50"
          />

          {/* Button */}
          <button 
            onClick={handleSubscribe}
            disabled={status === 'loading' || status === 'success'}
            className="h-[52px] px-8 rounded-full bg-[#FF8A3D] hover:bg-[#ff7a24] text-white font-[600] text-[15px] transition-colors shadow-[0_4px_14px_rgba(255,138,61,0.4)] disabled:opacity-50 flex items-center gap-2"
          >
            {status === 'loading' ? 'Subscribing...' : status === 'success' ? <><CheckCircle2 size={18} /> Subscribed</> : 'Subscribe'}
          </button>

        </div>

      </motion.div>
    </div>
  );
}
