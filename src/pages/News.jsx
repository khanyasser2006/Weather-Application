import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function News() {
  const newsItems = [
    {
      id: 1,
      category: 'Climate',
      date: '2 hours ago',
      title: 'Global Temperatures Reach Historic Highs for Third Consecutive Month',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=60'
    },
    {
      id: 2,
      category: 'Severe Weather',
      date: '5 hours ago',
      title: 'Pacific Typhoon Season Expected to be Above Average This Year',
      image: 'https://images.unsplash.com/photo-1518063319789-7217e6706b04?w=800&auto=format&fit=crop&q=60'
    },
    {
      id: 3,
      category: 'Technology',
      date: '1 day ago',
      title: 'New AI Models Improve Forecast Accuracy by 30% in High-Risk Areas',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=60'
    },
    {
      id: 4,
      category: 'Environment',
      date: '2 days ago',
      title: 'Arctic Ice Extent Tracks Below Historical Averages Ahead of Summer',
      image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&auto=format&fit=crop&q=60'
    }
  ];

  return (
    <div className="flex flex-col w-full max-w-[1440px] mx-auto px-6 md:px-10 mt-12 pb-12 flex-1">
      <div className="flex flex-col gap-2 mb-10">
        <h1 className="text-[36px] font-[800] text-white tracking-tight drop-shadow-sm">
          Weather & Climate News
        </h1>
        <p className="text-[16px] text-white/70 font-medium">
          The latest updates on global weather events and environmental changes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {newsItems.map((news) => (
          <div key={news.id} className="group flex flex-col bg-[rgba(10,15,25,0.55)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.04)] rounded-[24px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.25)] cursor-pointer">
            <div className="w-full h-[240px] relative overflow-hidden">
              <img 
                src={news.image} 
                alt={news.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1525] to-transparent opacity-80" />
            </div>
            
            <div className="flex flex-col p-8 flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[12px] font-[700] text-[#FF8A3D] uppercase tracking-wider bg-[#FF8A3D]/10 px-3 py-1 rounded-full">
                  {news.category}
                </span>
                <span className="text-[13px] text-white/50 font-[500]">{news.date}</span>
              </div>
              
              <h3 className="text-[22px] font-[700] text-white leading-tight mb-6 group-hover:text-[#FF8A3D] transition-colors">
                {news.title}
              </h3>
              
              <div className="mt-auto flex items-center gap-2 text-[14px] font-[600] text-white/70 group-hover:text-white transition-colors">
                Read Full Article
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
