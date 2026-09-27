import React from 'react';
import { Calendar, PhoneCall, Shield } from 'lucide-react';
import { HERO_IMAGE } from '../data/salonData';

export const CtaBanner: React.FC<{ onOpenBooking: () => void }> = ({ onOpenBooking }) => {
  return (
    <section className="relative py-28 overflow-hidden bg-[#0c0b09] border-t border-[#292722]">
      {/* Background Image with Dark Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="The Gentlemen's Cut Barbershop Lounge"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/85 to-black/95" />
        <div className="absolute inset-0 bg-grain opacity-50 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 mb-4">
          <Shield className="w-4 h-4 text-[#c5a059]" />
          <span className="text-xs uppercase tracking-[0.25em] text-[#dec58b] font-['Cinzel'] font-medium">
            Strict Unhurried Appointments
          </span>
        </div>

        <h2 className="font-['Cinzel'] text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#fbf8f0] mb-4 [text-wrap:balance]">
          Ready For Your Next Signature Look?
        </h2>

        <p className="font-['Cormorant_Garamond'] italic text-xl sm:text-2xl text-[#d4af37] mb-8">
          “Your style deserves precision.”
        </p>

        <p className="text-xs sm:text-sm text-[#bfb8aa] max-w-xl mx-auto mb-10 font-light leading-relaxed">
          Reserve your preferred barber and chair in under 60 seconds. No waiting in lounge lines, guaranteed punctual start.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-9 py-4 bg-[#c5a059] hover:bg-[#dec58b] text-[#0c0b09] font-bold text-xs uppercase tracking-[0.25em] transition-all shadow-xl shadow-[#c5a059]/20 flex items-center justify-center gap-2.5"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Your Appointment</span>
          </button>

          <a
            href="tel:+919820045890"
            className="w-full sm:w-auto px-7 py-4 bg-[#171614]/90 hover:bg-[#24221e] text-[#f8f5ee] border border-[#3b3731] hover:border-[#c5a059] text-xs uppercase tracking-[0.2em] font-semibold transition-all flex items-center justify-center gap-2.5"
          >
            <PhoneCall className="w-4 h-4 text-[#c5a059]" />
            <span>Call Concierge</span>
          </a>
        </div>
      </div>
    </section>
  );
};
