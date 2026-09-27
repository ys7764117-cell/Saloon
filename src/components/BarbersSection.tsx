import React from 'react';
import { Star, Instagram, ChevronRight, Award, Scissors } from 'lucide-react';
import { BARBERS } from '../data/salonData';
import { Barber } from '../types/booking';

interface BarbersSectionProps {
  onSelectBarber: (barberId: string) => void;
}

export const BarbersSection: React.FC<BarbersSectionProps> = ({ onSelectBarber }) => {
  return (
    <section id="barbers" className="relative py-24 sm:py-32 bg-[#0c0b09] border-t border-[#1c1a16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[1px] bg-[#c5a059]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-medium font-['Cinzel']">
              Master Craftsmen
            </span>
            <span className="w-6 h-[1px] bg-[#c5a059]" />
          </div>
          <h2 className="font-['Cinzel'] text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#fbf8f0] mb-4 [text-wrap:balance]">
            Meet The Artists
          </h2>
          <p className="text-sm sm:text-base text-[#a8a193] font-light max-w-xl mx-auto leading-relaxed">
            Our barbers are artisans dedicated to the anatomy of male style, each with specialized disciplines in fades, long scissor layers, and straight-razor craftsmanship.
          </p>
        </div>

        {/* 4 Barber Profiles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {BARBERS.map((barber: Barber) => (
            <div
              key={barber.id}
              className="group bg-[#12110e] border border-[#24221e] hover:border-[#c5a059]/60 flex flex-col justify-between transition-all duration-300 shadow-xl overflow-hidden"
            >
              {/* Portrait Container */}
              <div className="relative h-72 sm:h-80 overflow-hidden bg-[#181714]">
                <img
                  src={barber.avatar}
                  alt={barber.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out filter grayscale-[20%] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12110e] via-transparent to-black/40" />

                {/* Rating Badge */}
                <div className="absolute top-3 left-3 bg-[#0c0b09]/80 backdrop-blur-sm border border-[#292722] px-2.5 py-1 flex items-center gap-1.5 text-xs text-[#f8f5ee]">
                  <Star className="w-3.5 h-3.5 fill-[#c5a059] text-[#c5a059]" />
                  <span className="font-bold">{barber.rating}</span>
                  <span className="text-[10px] text-[#8e877a]">({barber.reviewsCount})</span>
                </div>

                {/* Experience Chip */}
                <div className="absolute bottom-3 left-3 bg-[#171614]/90 backdrop-blur-sm border border-[#c5a059]/40 px-2.5 py-1 text-[11px] font-medium text-[#dec58b]">
                  {barber.experience}
                </div>
              </div>

              {/* Barber Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-['Cinzel'] text-lg font-bold uppercase tracking-wider text-[#f8f5ee] group-hover:text-[#dec58b] transition-colors">
                      {barber.name}
                    </h3>
                    <a
                      href={`https://instagram.com`}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${barber.name} on Instagram`}
                      className="text-[#8e877a] hover:text-[#c5a059] transition-colors p-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                  </div>

                  <div className="text-[11px] font-medium tracking-wider uppercase text-[#c5a059] mb-3">
                    {barber.position}
                  </div>

                  <div className="p-2.5 bg-[#171614] border border-[#24221e] mb-3 text-left">
                    <div className="text-[10px] uppercase tracking-wider text-[#8e877a] mb-0.5">
                      Specialty
                    </div>
                    <div className="text-xs font-semibold text-[#ded8cb]">
                      {barber.specialty}
                    </div>
                  </div>

                  <p className="text-[11px] text-[#9e9689] font-light leading-relaxed line-clamp-2 mb-5">
                    {barber.bio}
                  </p>
                </div>

                {/* Book With This Barber Button */}
                <button
                  onClick={() => onSelectBarber(barber.id)}
                  className="w-full py-2.5 px-3 bg-[#181714] border border-[#33302b] hover:border-[#c5a059] group-hover:bg-[#c5a059] group-hover:text-[#0c0b09] text-[11px] uppercase tracking-[0.2em] font-bold text-[#dec58b] transition-all duration-300 flex items-center justify-center gap-1.5"
                >
                  <Scissors className="w-3.5 h-3.5" />
                  <span>Book With This Barber</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
