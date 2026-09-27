import React from 'react';
import { Scissors, Instagram, Facebook, Phone, Mail, MapPin, ArrowUp } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

export const Footer: React.FC<{ onOpenBooking: () => void }> = ({ onOpenBooking }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070605] border-t border-[#1c1a16] text-[#bfb8aa] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#1c1a16]">
          {/* Brand Info & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded border border-[#c5a059]/40 bg-[#12110e] flex items-center justify-center text-[#c5a059]">
                <Scissors className="w-5 h-5" />
              </div>
              <div>
                <span className="font-['Cinzel'] text-lg font-bold tracking-[0.2em] text-[#f8f5ee] uppercase leading-none block">
                  {SALON_INFO.name}
                </span>
                <span className="text-[10px] tracking-[0.25em] text-[#c5a059] uppercase mt-1 block font-medium">
                  {SALON_INFO.tagline}
                </span>
              </div>
            </div>

            <p className="text-xs text-[#8e877a] leading-relaxed max-w-sm font-light pt-2">
              Combining traditional European barbering techniques with modern styling aesthetics, luxury service, and bespoke grooming since 2018.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded bg-[#12110e] border border-[#292722] flex items-center justify-center text-[#c5a059] hover:border-[#c5a059] hover:text-white transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded bg-[#12110e] border border-[#292722] flex items-center justify-center text-[#c5a059] hover:border-[#c5a059] hover:text-white transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-['Cinzel'] text-xs font-bold uppercase tracking-[0.2em] text-[#f8f5ee] mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#home" className="hover:text-[#c5a059] transition-colors">Home Overview</a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#c5a059] transition-colors">About Our Craft</a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#c5a059] transition-colors">Service Menu</a>
              </li>
              <li>
                <a href="#barbers" className="hover:text-[#c5a059] transition-colors">Master Barbers</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#c5a059] transition-colors">Client Lookbook</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#c5a059] transition-colors">Patron Reviews</a>
              </li>
            </ul>
          </div>

          {/* Signature Services */}
          <div>
            <h4 className="font-['Cinzel'] text-xs font-bold uppercase tracking-[0.2em] text-[#f8f5ee] mb-4">
              Popular Services
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={onOpenBooking} className="hover:text-[#c5a059] transition-colors text-left">
                  Classic Haircut (₹499)
                </button>
              </li>
              <li>
                <button onClick={onOpenBooking} className="hover:text-[#c5a059] transition-colors text-left">
                  Premium Haircut & Styling (₹799)
                </button>
              </li>
              <li>
                <button onClick={onOpenBooking} className="hover:text-[#c5a059] transition-colors text-left">
                  Beard Sculpting (₹399)
                </button>
              </li>
              <li>
                <button onClick={onOpenBooking} className="hover:text-[#c5a059] transition-colors text-left">
                  Haircut + Beard (₹999)
                </button>
              </li>
              <li>
                <button onClick={onOpenBooking} className="hover:text-[#c5a059] transition-colors text-left">
                  The Gentleman’s Experience (₹1,999)
                </button>
              </li>
            </ul>
          </div>

          {/* Operating Hours & Contact */}
          <div>
            <h4 className="font-['Cinzel'] text-xs font-bold uppercase tracking-[0.2em] text-[#f8f5ee] mb-4">
              Visiting Hours
            </h4>
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-[#8e877a] block text-[11px]">Mon – Sat:</span>
                <span className="text-[#ded8cb] font-mono">9:00 AM – 9:00 PM</span>
              </div>
              <div className="pt-1">
                <span className="text-[#8e877a] block text-[11px]">Sunday:</span>
                <span className="text-[#ded8cb] font-mono">10:00 AM – 6:00 PM</span>
              </div>
              <div className="pt-3">
                <button
                  onClick={onOpenBooking}
                  className="w-full py-2 px-3 bg-[#1b1915] border border-[#c5a059] hover:bg-[#c5a059] hover:text-[#0c0b09] text-[11px] uppercase tracking-wider font-bold transition-colors"
                >
                  Reserve Appointment
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#716b60]">
          <div>
            © 2026 The Gentlemen’s Cut. All Rights Reserved. Handcrafted for modern gentlemen.
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-[#dec58b] cursor-pointer">Privacy Policy</span>
            <span>·</span>
            <span className="hover:text-[#dec58b] cursor-pointer">Terms of Service</span>
            <span>·</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-[#dec58b] hover:text-white transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
