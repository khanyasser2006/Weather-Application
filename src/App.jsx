import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Agentation } from "agentation";
import MainLayout from './layouts/MainLayout';
import ScrollToTop from './components/ScrollToTop';
import useWeatherStore from './store/useWeatherStore';

// Lazy load pages for performance
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Today = lazy(() => import('./pages/Today'));
const Tomorrow = lazy(() => import('./pages/Tomorrow'));
const TenDays = lazy(() => import('./pages/TenDays'));
const Radar = lazy(() => import('./pages/Radar'));
const AQIPage = lazy(() => import('./pages/AQIPage'));
const Alerts = lazy(() => import('./pages/Alerts'));
const Insights = lazy(() => import('./pages/Insights'));
const News = lazy(() => import('./pages/News'));
const Forecast = lazy(() => import('./pages/Forecast'));

// Detail Analytics Pages
const AqiDetails = lazy(() => import('./pages/AqiDetails'));
const HourlyForecastDetails = lazy(() => import('./pages/HourlyForecastDetails'));
const ExtendedForecast = lazy(() => import('./pages/ExtendedForecast'));

// Static Pages
const About = lazy(() => import('./pages/About'));
const Careers = lazy(() => import('./pages/Careers'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const Help = lazy(() => import('./pages/Help'));
const Contact = lazy(() => import('./pages/Contact'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Feedback = lazy(() => import('./pages/Feedback'));
const DeveloperDashboard = lazy(() => import('./pages/DeveloperDashboard'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Fallback loader
const PageLoader = () => (
  <div className="flex-1 flex items-center justify-center min-h-[500px]">
    <div className="w-10 h-10 border-4 border-[#FF8A3D] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default function App() {
  const requestGeolocation = useWeatherStore(state => state.requestGeolocation);

  useEffect(() => {
    requestGeolocation();
  }, [requestGeolocation]);

  return (
    <>
      <Router>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="today" element={<Today />} />
              <Route path="tomorrow" element={<Tomorrow />} />
              <Route path="10-days" element={<TenDays />} />
              <Route path="radar" element={<Radar />} />
              <Route path="aqi" element={<AQIPage />} />
              <Route path="alerts" element={<Alerts />} />
              <Route path="insights" element={<Insights />} />
              <Route path="news" element={<News />} />
              <Route path="forecast" element={<Forecast />} />
              <Route path="maps" element={<Navigate to="/radar" replace />} />
              
              {/* Detailed Analytics */}
              <Route path="aqi-details" element={<AqiDetails />} />
              <Route path="hourly-forecast" element={<HourlyForecastDetails />} />
              <Route path="forecast-extended" element={<ExtendedForecast />} />
              
              {/* Footer Static Pages */}
              <Route path="about" element={<About />} />
              <Route path="careers" element={<Careers />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="terms" element={<Terms />} />
              <Route path="help" element={<Help />} />
              <Route path="contact" element={<Contact />} />
              <Route path="faq" element={<FAQ />} />
              <Route path="feedback" element={<Feedback />} />
              <Route path="developer" element={<DeveloperDashboard />} />
              
              {/* 404 Catch All */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>

      {process.env.NODE_ENV === "development" && (
        <Agentation 
          endpoint="http://localhost:5118"
          onSessionCreated={(sessionId) => {
            console.log("Agentation session started:", sessionId);
          }}
        />
      )}
    </>
  );
}
