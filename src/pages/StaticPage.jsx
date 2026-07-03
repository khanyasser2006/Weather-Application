import React from 'react';

export default function StaticPage({ title }) {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10 flex flex-col justify-center mt-12 pb-12 flex-1">
      <div className="bg-[rgba(10,15,25,0.55)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.04)] rounded-[24px] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.25)] border-t-[rgba(255,138,61,0.25)] min-h-[50vh]">
        <h1 className="text-[36px] font-[800] text-white tracking-tight mb-8 drop-shadow-sm">
          {title}
        </h1>
        <div className="text-[16px] text-white/80 leading-relaxed max-w-3xl flex flex-col gap-6">
          <p>
            Welcome to the {title} page. This section contains important information regarding our policies, 
            services, and company details.
          </p>
          <p>
            We are committed to providing the most accurate and real-time weather forecasts globally. Our 
            advanced data models and interactive mapping systems ensure you stay informed and prepared for 
            any atmospheric conditions.
          </p>
          <p>
            If you have any questions or require further assistance, please navigate to our Help Center 
            or Contact Us directly. Our support team is available 24/7.
          </p>
        </div>
      </div>
    </div>
  );
}
