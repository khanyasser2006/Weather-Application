import React from 'react';
import PageShell from '../components/PageShell';

export default function Careers() {
  return (
    <PageShell 
      title="Careers at Skyrora" 
      subtitle="Join us in building the future of atmospheric intelligence."
    >
      <p>
        We are always looking for brilliant minds who are passionate about meteorology, data science, and beautiful design. 
        If you want to work on complex challenges at a global scale, Skyrora is the place for you.
      </p>

      <div className="mt-8 flex flex-col gap-6">
        <div className="border border-[rgba(255,255,255,0.06)] rounded-xl p-6 bg-white/[0.02]">
          <h4 className="text-white text-[20px] font-[700] mb-2">Senior Frontend Engineer</h4>
          <span className="text-[#FF8A3D] text-[14px] font-[600] uppercase tracking-wider block mb-4">Remote • Full-Time</span>
          <p className="mb-0">Help us build and scale our core React application and interactive WebGL radar systems.</p>
        </div>

        <div className="border border-[rgba(255,255,255,0.06)] rounded-xl p-6 bg-white/[0.02]">
          <h4 className="text-white text-[20px] font-[700] mb-2">Meteorological Data Scientist</h4>
          <span className="text-[#FF8A3D] text-[14px] font-[600] uppercase tracking-wider block mb-4">New York / Remote • Full-Time</span>
          <p className="mb-0">Design and optimize our prediction models using historical climate data and live sensor networks.</p>
        </div>

        <div className="border border-[rgba(255,255,255,0.06)] rounded-xl p-6 bg-white/[0.02]">
          <h4 className="text-white text-[20px] font-[700] mb-2">Product Designer</h4>
          <span className="text-[#FF8A3D] text-[14px] font-[600] uppercase tracking-wider block mb-4">London • Full-Time</span>
          <p className="mb-0">Shape the visual language of Skyrora. Experience with complex data visualization is a major plus.</p>
        </div>
      </div>
    </PageShell>
  );
}
