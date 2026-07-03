import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnalyticsCardWrapper from './AnalyticsCardWrapper';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import useWeatherStore from '../store/useWeatherStore';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import WeatherMapSkeleton from './skeletons/WeatherMapSkeleton';

// Fix Leaflet's default icon path issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

export default function WeatherMapCard() {
  const location = useWeatherStore(state => state.location);
  const weatherData = useWeatherStore(state => state.weatherData);
  const isLoading = useWeatherStore(state => state.isLoading);
  const [position, setPosition] = useState([51.505, -0.09]);

  useEffect(() => {
    if (location && location.lat && location.lon) {
      setPosition([location.lat, location.lon]);
    }
  }, [location]);

  return (
    <AnimatePresence mode="wait">
      {isLoading || !weatherData ? (
        <WeatherMapSkeleton key="skeleton" />
      ) : (
        <Content key="content" position={position} />
      )}
    </AnimatePresence>
  );
}

function Content({ position }) {
  return (
    <motion.div
      key="content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      transition={{ duration: 0.3 }}
      className="w-full h-full"
    >
      <AnalyticsCardWrapper className="relative flex flex-col p-0 overflow-hidden">
        <h4 className="absolute top-[28px] left-[28px] z-[400] text-[14px] font-[700] text-white uppercase tracking-[0.1em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] bg-black/40 px-3 py-1 rounded-md backdrop-blur-sm">
          Weather Map
        </h4>

        <div className="flex-1 w-full relative z-0 h-full min-h-[300px]">
          <MapContainer 
            center={position} 
            zoom={10} 
            scrollWheelZoom={false} 
            style={{ height: '100%', width: '100%', borderRadius: '24px' }}
            zoomControl={false}
          >
            <ChangeView center={position} zoom={10} />
            {/* Dark themed map tiles (CartoDB Dark Matter) */}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            {/* Precipitation overlay */}
            <Marker position={position} />
          </MapContainer>
        </div>
        
        {/* Overlay to give it a matching aesthetic */}
        <div className="absolute inset-0 pointer-events-none rounded-[24px] shadow-[inset_0_0_40px_rgba(4,10,20,0.6)]" />

      </AnalyticsCardWrapper>
    </motion.div>
  );
}
