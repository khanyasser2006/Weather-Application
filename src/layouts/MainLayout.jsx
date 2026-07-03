import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import heroBackground from '../assets/weather/hero-background.jpg';
import { pageTransition } from '../utils/animations';
import useIntroAnimation from '../hooks/useIntroAnimation';

export default function MainLayout() {
  const [imgError, setImgError] = useState(false);
  const location = useLocation();
  const isFirstLoad = useIntroAnimation();

  return (
    <div className="min-h-screen bg-[#08111F] relative overflow-x-hidden font-sans flex flex-col">
       {/* Global Absolute Background - NEVER ANIMATED DURING ROUTE CHANGES */}
       <motion.div 
         initial={isFirstLoad ? { opacity: 0 } : { opacity: 1 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 1, ease: "easeOut" }}
         className="fixed inset-0 z-0 pointer-events-none"
       >
          {/* Top image section */}
          <div className="absolute top-0 left-0 w-full h-[800px] bg-[#140f0a]">
             {!imgError && (
               <img 
                 src={heroBackground} 
                 className="absolute inset-0 w-full h-full object-cover object-center" 
                 onError={() => setImgError(true)} 
               />
             )}
             <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(20, 15, 10, 0.7) 0%, rgba(20, 15, 10, 0.2) 50%, rgba(20, 15, 10, 0) 100%)' }} />
             <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(20, 15, 10, 0.4) 0%, rgba(20, 15, 10, 0) 15%)' }} />
             <div className="absolute inset-x-0 bottom-0 h-[400px]" style={{ background: 'linear-gradient(to top, #08111F 0%, rgba(8,17,31,0.8) 40%, transparent 100%)' }} />
          </div>
          {/* Bottom gradient section */}
          <div className="absolute top-[800px] bottom-0 w-full bg-[#08111F]">
             <div className="absolute top-0 left-[20%] w-[800px] h-[800px] bg-[rgba(255,138,61,0.05)] blur-[150px] rounded-full" />
             <div className="absolute top-[30%] right-[5%] w-[600px] h-[600px] bg-[rgba(255,138,61,0.04)] blur-[130px] rounded-full" />
             <div className="absolute bottom-[10%] left-[40%] w-[700px] h-[700px] bg-[rgba(255,120,40,0.03)] blur-[140px] rounded-full" />
          </div>
       </motion.div>

       {/* Interactive Foreground */}
       <div className="relative z-10 flex flex-col flex-1 pt-4">
          <Navbar />
          <AnimatePresence mode="wait">
            <motion.main 
              key={location.pathname}
              variants={pageTransition}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex-1 w-full flex flex-col relative z-20"
            >
               <Outlet />
            </motion.main>
          </AnimatePresence>
          <div className="mt-auto">
            <Footer />
          </div>
       </div>
    </div>
  );
}
