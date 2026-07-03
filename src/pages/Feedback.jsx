import React from 'react';
import PageShell from '../components/PageShell';
import { MessageSquare } from 'lucide-react';

export default function Feedback() {
  return (
    <PageShell 
      title="Provide Feedback" 
      subtitle="Help us improve Skyrora. We read every piece of feedback."
    >
      <form className="flex flex-col gap-6 mt-4 max-w-[600px] w-full mx-auto" onSubmit={(e) => e.preventDefault()}>
        
        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-[600] text-white">Feedback Type</label>
          <div className="relative">
            <select className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF8A3D] transition-colors appearance-none cursor-pointer">
              <option className="bg-[#0B1525]">Feature Request</option>
              <option className="bg-[#0B1525]">Bug Report</option>
              <option className="bg-[#0B1525]">Design Suggestion</option>
              <option className="bg-[#0B1525]">Other</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-[600] text-white">Your Thoughts</label>
          <textarea 
            rows="6"
            placeholder="Tell us what you love or what could be better..."
            className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#FF8A3D] transition-colors resize-none"
          ></textarea>
        </div>

        <button 
          type="submit"
          className="flex items-center justify-center gap-2 mt-4 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] text-white font-[600] rounded-xl px-6 py-4 transition-all duration-300"
        >
          <MessageSquare size={18} />
          <span>Submit Feedback</span>
        </button>

      </form>
    </PageShell>
  );
}
