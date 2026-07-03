import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useWeatherStore = create(persist((set, get) => ({
  location: null, // { lat, lon, name, country }
  weatherData: null, 
  isLoading: false,
  error: null,
  metrics: {
    totalRequests: 0,
    successfulRequests: 0,
    failedRequests: 0,
    history: [],
    lastLatency: 0,
  },
  
  setLocation: (location) => {
    set({ location });
    get().fetchWeather(location.lat, location.lon);
  },
  
  fetchWeather: async (lat, lon) => {
    set({ isLoading: true, error: null });
    const startTime = performance.now();
    try {
      const response = await fetch(`http://localhost:5118/api/weather/dashboard?lat=${lat}&lon=${lon}`);
      const endTime = performance.now();
      const latency = Math.round(endTime - startTime);
      
      if (!response.ok) throw new Error('Failed to fetch weather data');
      const data = await response.json();
      
      set((state) => {
        const newHistory = [...state.metrics.history, { 
          time: new Date().toLocaleTimeString('en-US', { hour12: false }), 
          latency, 
          success: true 
        }].slice(-20);
        
        console.log("Latency Added", latency);
        console.log("History Count", newHistory.length);
        
        return { 
          weatherData: data, 
          isLoading: false,
          metrics: {
            ...state.metrics,
            totalRequests: state.metrics.totalRequests + 1,
            successfulRequests: state.metrics.successfulRequests + 1,
            lastLatency: latency,
            history: newHistory
          }
        };
      });
    } catch (error) {
      const endTime = performance.now();
      const latency = Math.round(endTime - startTime);
      set((state) => {
        const newHistory = [...state.metrics.history, { 
          time: new Date().toLocaleTimeString('en-US', { hour12: false }), 
          latency, 
          success: false 
        }].slice(-20);
        
        console.log("Latency Added (Error)", latency);
        console.log("History Count", newHistory.length);
        
        return { 
          error: error.message, 
          isLoading: false,
          metrics: {
            ...state.metrics,
            totalRequests: state.metrics.totalRequests + 1,
            failedRequests: state.metrics.failedRequests + 1,
            lastLatency: latency,
            history: newHistory
          }
        };
      });
    }
  },

  requestGeolocation: () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          set({ location: { lat, lon, name: "Current Location", country: "" } });
          get().fetchWeather(lat, lon);
        },
        (error) => {
          console.warn("Geolocation denied or failed. Defaulting to London.");
          const defaultLoc = { lat: 51.5074, lon: -0.1278, name: "London", country: "United Kingdom" };
          set({ location: defaultLoc });
          get().fetchWeather(defaultLoc.lat, defaultLoc.lon);
        }
      );
    } else {
      const defaultLoc = { lat: 51.5074, lon: -0.1278, name: "London", country: "United Kingdom" };
      set({ location: defaultLoc });
      get().fetchWeather(defaultLoc.lat, defaultLoc.lon);
    }
  }
}), {
  name: 'weather-storage',
  partialize: (state) => ({ metrics: state.metrics })
}));

export default useWeatherStore;
