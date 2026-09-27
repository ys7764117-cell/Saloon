import React from 'react';
import { ArrowDown, Calendar, Scissors, Award, Clock } from 'lucide-react';
import { HERO_IMAGE } from '../data/salonData';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExploreServices }) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Dark Cinematic Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="The Gentlemen's Cut luxury barbershop interior"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Layered gradients for maximum legibility and dark luxury tone */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b09] via-[#0c0b09]/75 to-black/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-[#0c0b09]/95" />
        <div className="absolute inset-0 bg-grain pointer-events-none opacity-40" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        {/* Established Badge / Small Label */}
        <div className="inline-flex items-center gap-3 px-4 py-1.5 border border-[#c5a059]/40 bg-[#12110e]/80 backdrop-blur-sm mb-8 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] animate-pulse" />
          <span className="text-[11px] sm:text-xs tracking-[0.3em] uppercase text-[#dec58b] font-medium font-['Cinzel']">
            EST. 2018 · PREMIUM MEN’S GROOMING
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] animate-pulse" />
        </div>

        {/* Main Editorial Heading */}
        <h1 className="font-['Cinzel'] text-4xl sm:text-6xl md:text-7xl font-bold tracking-[0.06em] text-[#fbf8f0] uppercase leading-[1.08] mb-6 max-w-4xl [text-wrap:balance]">
          Crafting Confidence, <br />
          <span className="gold-gradient-text italic font-['Cormorant_Garamond'] lowercase tracking-normal font-normal block sm:inline mt-1 sm:mt-0">
            one cut
          </span>{' '}
          at a time.
        </h1>

        {/* Narrative Description */}
        <p className="text-base sm:text-lg md:text-xl text-[#cfc7b9] font-light max-w-2xl mx-auto leading-relaxed mb-10 [text-wrap:balance]">
          “Experience precision grooming, timeless style and exceptional service in an atmosphere designed for the modern gentleman.”
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-8 py-4 bg-[#c5a059] hover:bg-[#dec58b] text-[#0c0b09] font-bold text-xs uppercase tracking-[0.25em] transition-all duration-300 shadow-xl shadow-[#c5a059]/20 flex items-center justify-center gap-3 group"
          >
            <Calendar className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span>Book an Appointment</span>
          </button>

          <button
            onClick={onExploreServices}
            className="w-full sm:w-auto px-8 py-4 bg-[#141310]/80 hover:bg-[#201d18] text-[#f8f5ee] border border-[#3b3731] hover:border-[#c5a059]/70 font-semibold text-xs uppercase tracking-[0.25em] transition-all duration-300 flex items-center justify-center gap-3"
          >
            <Scissors className="w-4 h-4 text-[#c5a059]" />
            <span>Explore Services</span>
          </button>
        </div>

        {/* Trust Badges Bar */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-16 mt-6 border-t border-[#292722]/60 w-full max-w-2xl text-left">
          <div className="flex items-center gap-3">
            <Award className="w-5 h-5 text-[#c5a059] shrink-0" />
            <div className="text-xs">
              <span className="block text-[#f8f5ee] font-medium">Bespoke Precision</span>
              <span className="text-[#8e877a] text-[11px]">Individual facial mapping</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-[#c5a059] shrink-0" />
            <div className="text-xs">
              <span className="block text-[#f8f5ee] font-medium">Zero Wait Time</span>
              <span className="text-[#8e877a] text-[11px]">Strict reserved scheduling</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Scissors className="w-5 h-5 text-[#c5a059] shrink-0" />
            <div className="text-xs">
              <span className="block text-[#f8f5ee] font-medium">Master Craftsmen</span>
              <span className="text-[#8e877a] text-[11px]">London & Milan trained</span>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Down Prompt */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#aa843f]">Scroll</span>
        <button
          onClick={onExploreServices}
          aria-label="Scroll down to services"
          className="p-1 text-[#c5a059] animate-bounce"
        >
          <ArrowDown className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
