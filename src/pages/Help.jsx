import React from 'react';
import PageShell from '../components/PageShell';

export default function Help() {
  return (
    <PageShell 
      title="Help Center" 
      subtitle="Find answers to common questions and learn how to make the most of Skyrora."
    >
      <h3>Getting Started</h3>
      <p>
        Skyrora automatically detects your location to provide immediate weather forecasts upon opening. If you prefer, 
        you can search for any global city using the search bar located in the top navigation menu.
      </p>

      <h3>Understanding the Radar</h3>
      <p>
        Our interactive radar map shows real-time precipitation, cloud cover, and severe weather systems. 
        You can zoom in on your specific neighborhood or zoom out to see macro-level weather patterns across continents.
      </p>

      <h3>Air Quality Index (AQI)</h3>
      <p>
        We measure air quality based on standardized international metrics. An AQI under 50 is considered "Good", 
        while anything over 150 may be "Unhealthy" for sensitive groups. We track PM2.5, PM10, Ozone, and Nitrogen Dioxide.
      </p>
      
      <div className="mt-12 p-6 bg-[#FF8A3D]/10 border border-[#FF8A3D]/20 rounded-xl">
        <h4 className="text-[#FF8A3D] text-[18px] font-[700] mb-2 mt-0">Still need assistance?</h4>
        <p className="mb-0 text-white/80">
          Our support team is available 24/7. Head over to the <a href="/contact" className="text-white underline hover:text-[#FF8A3D]">Contact Us</a> page to send us a direct message.
        </p>
      </div>
    </PageShell>
  );
}
