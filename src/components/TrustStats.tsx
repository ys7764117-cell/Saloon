import React from 'react';
import { SALON_STATS } from '../data/salonData';

export const TrustStats: React.FC = () => {
  return (
    <section className="relative z-20 bg-[#100f0c] border-y border-[#292722]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 divide-y lg:divide-y-0 lg:divide-x divide-[#292722]">
          {SALON_STATS.map((stat, idx) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center text-center ${
                idx % 2 === 0 ? 'pt-4 lg:pt-0' : 'pt-4 lg:pt-0'
              } px-4`}
            >
              <div className="font-['Cinzel'] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#fbf8f0] mb-2 tabular-nums">
                <span className="text-[#c5a059]">{stat.value}</span>
              </div>
              <div className="text-xs uppercase tracking-[0.2em] font-medium text-[#d6d0c4] mb-1">
                {stat.label}
              </div>
              <div className="text-[11px] text-[#8e877a] font-light">
                {stat.note}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
