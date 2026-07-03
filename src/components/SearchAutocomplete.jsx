import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin } from 'lucide-react';
import useWeatherStore from '../store/useWeatherStore';

export default function SearchAutocomplete() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  
  const setLocation = useWeatherStore(state => state.setLocation);

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced Search
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.length > 2) {
        try {
          const res = await fetch(`http://localhost:5118/api/location/search?query=${query}`);
          const data = await res.json();
          setResults(data);
          setIsOpen(true);
        } catch (e) {
          console.error("Search failed", e);
        }
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleSelect = (loc) => {
    setLocation({
      lat: loc.latitude,
      lon: loc.longitude,
      name: loc.name,
      country: loc.country
    });
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-[240px]">
      <div className="flex items-center bg-white/5 border border-transparent rounded-[12px] p-1 w-full h-[40px] shadow-sm transition-all focus-within:bg-white/10 focus-within:border-white/30">
        <button className="w-8 h-8 flex items-center justify-center shrink-0 opacity-50 hover:opacity-100 transition-opacity">
          <Search size={14} className="text-white" />
        </button>
        <input 
          type="text" 
          placeholder="Search city..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => { if(results.length > 0) setIsOpen(true); }}
          className="bg-transparent border-none outline-none text-white text-[14px] w-full px-2 placeholder:text-white/40"
        />
      </div>

      {/* Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-[48px] left-0 w-full bg-[#111A28]/90 backdrop-blur-xl border border-white/10 rounded-[12px] overflow-hidden z-50 shadow-2xl">
          {results.map((loc) => (
            <button
              key={loc.id}
              onClick={() => handleSelect(loc)}
              className="w-full text-left px-4 py-3 hover:bg-white/10 transition-colors flex items-start gap-3 border-b border-white/5 last:border-b-0"
            >
              <MapPin size={16} className="text-[#FF8A3D] mt-0.5 shrink-0" />
              <div>
                <p className="text-white text-[14px] font-medium leading-none mb-1">{loc.name}</p>
                <p className="text-white/50 text-[12px] leading-none">
                  {loc.admin1 ? `${loc.admin1}, ` : ''}{loc.country}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
