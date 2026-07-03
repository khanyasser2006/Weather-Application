import React, { useState } from 'react';
import PageShell from '../components/PageShell';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "Where does Skyrora get its weather data?",
    answer: "We aggregate data from multiple highly reliable sources, including the Open-Meteo API, national weather services, and localized sensor networks to provide the most accurate forecasts."
  },
  {
    question: "How frequently is the weather data updated?",
    answer: "Our current weather conditions and air quality metrics are updated every 15 minutes. Forecast data is refreshed every hour to ensure accuracy."
  },
  {
    question: "Is the radar map real-time?",
    answer: "Yes, the interactive radar map provides near real-time visualization of precipitation and cloud cover, with updates streaming in every 10-15 minutes depending on radar station availability."
  },
  {
    question: "Can I save multiple locations?",
    answer: "Currently, Skyrora relies on your active geolocation or manual search. In an upcoming release, we will introduce user accounts allowing you to save and track multiple cities globally."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <PageShell 
      title="Frequently Asked Questions" 
      subtitle="Quick answers to questions you might have about Skyrora."
    >
      <div className="flex flex-col gap-4 mt-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div 
              key={idx} 
              className={`border border-[rgba(255,255,255,0.06)] rounded-xl overflow-hidden transition-colors ${isOpen ? 'bg-white/[0.04]' : 'bg-transparent hover:bg-white/[0.02]'}`}
            >
              <button 
                className="w-full flex items-center justify-between p-6 text-left"
                onClick={() => setOpenIndex(isOpen ? -1 : idx)}
              >
                <span className="text-[18px] font-[600] text-white pr-8">{faq.question}</span>
                <ChevronDown 
                  size={20} 
                  className={`text-[#FF8A3D] transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`} 
                />
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="p-6 pt-0 text-[#A7B2C7] leading-[1.6]">
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </PageShell>
  );
}
