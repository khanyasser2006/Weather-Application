import React from 'react';
import { CloudSun, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { staggerContainer, footerStaggerItem } from '../utils/animations';

export default function Footer() {
  return (
    <footer 
      className="w-full pt-24 pb-12 mt-auto border-t border-[rgba(255,138,61,0.1)] z-20 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050A14 0%, #0d0f12 30%, #15100c 60%, #120d09 80%, #0a0704 100%)' }}
    >
      
      {/* Orange Gradient Atmosphere */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[rgba(255,138,61,0.4)] to-transparent pointer-events-none" />
      <div className="absolute top-0 left-[20%] w-[600px] h-[400px] bg-[rgba(255,138,61,0.12)] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-[10%] right-[15%] w-[500px] h-[350px] bg-[rgba(255,120,40,0.08)] blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[rgba(255,138,61,0.08)] blur-[140px] pointer-events-none rounded-t-full translate-y-1/3" />

      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10 relative z-10">
        
        {/* Top Section: 4 Columns */}
        <motion.div 
          variants={staggerContainer(0.1, 0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-20"
        >
          
          {/* Column 1: Brand Area */}
          <motion.div variants={footerStaggerItem} className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col pr-4">
            <Link to="/" className="flex items-center gap-3 group relative w-fit z-50 pointer-events-auto cursor-pointer hover:-translate-y-[2px] transition-all duration-200">
              <div className="w-[42px] h-[42px] rounded-full bg-gradient-to-br from-[#FF8A3D] to-[#E66A17] flex items-center justify-center shadow-[0_0_20px_rgba(255,138,61,0.4)] group-hover:scale-105 transition-transform duration-300">
                <Sun size={24} className="text-white fill-white" />
              </div>
              <span className="font-logo text-white font-[800] text-[32px] tracking-wide drop-shadow-sm transition-colors hover:text-[#FF8A3D]">Skyora</span>
            </Link>
            <p className="text-[15px] text-[#A7B2C7] leading-[1.8] mb-10 max-w-[280px]">
              Providing the most accurate real-time weather forecasts, interactive radar maps, and detailed atmospheric data globally.
            </p>
          </motion.div>

          {/* Column 2: PRODUCT */}
          <motion.div variants={footerStaggerItem} className="flex flex-col">
            <h4 className="text-[15px] font-[800] text-white uppercase tracking-wider mb-8 drop-shadow-sm">Product</h4>
            <ul className="flex flex-col gap-5">
              <li><Link to="/forecast" className="text-[14px] text-[#A7B2C7] hover:text-white transition-colors font-[500]">Forecast</Link></li>
              <li><Link to="/maps" className="text-[14px] text-[#A7B2C7] hover:text-white transition-colors font-[500]">Maps</Link></li>
              <li><Link to="/aqi" className="text-[14px] text-[#A7B2C7] hover:text-white transition-colors font-[500]">Air Quality</Link></li>
              <li><Link to="/news" className="text-[14px] text-[#A7B2C7] hover:text-white transition-colors font-[500]">News</Link></li>
            </ul>
          </motion.div>

          {/* Column 3: COMPANY */}
          <motion.div variants={footerStaggerItem} className="flex flex-col">
            <h4 className="text-[15px] font-[800] text-white uppercase tracking-wider mb-8 drop-shadow-sm">Company</h4>
            <ul className="flex flex-col gap-5">
              <li><Link to="/about" className="text-[14px] text-[#A7B2C7] hover:text-white transition-colors font-[500]">About Us</Link></li>
              <li><Link to="/careers" className="text-[14px] text-[#A7B2C7] hover:text-white transition-colors font-[500]">Careers</Link></li>
              <li><Link to="/privacy" className="text-[14px] text-[#A7B2C7] hover:text-white transition-colors font-[500]">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-[14px] text-[#A7B2C7] hover:text-white transition-colors font-[500]">Terms of Service</Link></li>
            </ul>
          </motion.div>

          {/* Column 4: SUPPORT */}
          <motion.div variants={footerStaggerItem} className="flex flex-col">
            <h4 className="text-[15px] font-[800] text-white uppercase tracking-wider mb-8 drop-shadow-sm">Support</h4>
            <ul className="flex flex-col gap-5">
              <li><Link to="/help" className="text-[14px] text-[#A7B2C7] hover:text-white transition-colors font-[500]">Help Center</Link></li>
              <li><Link to="/contact" className="text-[14px] text-[#A7B2C7] hover:text-white transition-colors font-[500]">Contact Us</Link></li>
              <li><Link to="/faq" className="text-[14px] text-[#A7B2C7] hover:text-white transition-colors font-[500]">FAQ</Link></li>
              <li><Link to="/feedback" className="text-[14px] text-[#A7B2C7] hover:text-white transition-colors font-[500]">Feedback</Link></li>
            </ul>
          </motion.div>

        </motion.div>

        {/* Bottom Bar */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between pt-6 border-t border-[rgba(255,255,255,0.06)]">
          <p className="text-[13px] text-white/50 mb-4 md:mb-0">
            © 2026 Weather App
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-[13px] text-white/50 hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-[13px] text-white/50 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
