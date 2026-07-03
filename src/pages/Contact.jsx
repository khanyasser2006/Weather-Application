import React from 'react';
import PageShell from '../components/PageShell';
import { Send } from 'lucide-react';

export default function Contact() {
  return (
    <PageShell 
      title="Contact Us" 
      subtitle="We'd love to hear from you. Send us a message and we'll respond as soon as possible."
    >
      <form className="flex flex-col gap-6 mt-4 max-w-[600px] w-full mx-auto" onSubmit={(e) => e.preventDefault()}>
        
        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-[600] text-white">Full Name</label>
          <input 
            type="text" 
            placeholder="Jane Doe"
            className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#FF8A3D] transition-colors"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-[600] text-white">Email Address</label>
          <input 
            type="email" 
            placeholder="jane@example.com"
            className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#FF8A3D] transition-colors"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-[600] text-white">Message</label>
          <textarea 
            rows="5"
            placeholder="How can we help you?"
            className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#FF8A3D] transition-colors resize-none"
          ></textarea>
        </div>

        <button 
          type="submit"
          className="flex items-center justify-center gap-2 mt-4 bg-gradient-to-r from-[#FF8A3D] to-[#FF6B00] hover:from-[#FF9A5A] hover:to-[#FF7A1A] text-white font-[600] rounded-xl px-6 py-4 transition-all duration-300 shadow-[0_4px_14px_rgba(255,138,61,0.3)]"
        >
          <span>Send Message</span>
          <Send size={18} />
        </button>

      </form>
    </PageShell>
  );
}
