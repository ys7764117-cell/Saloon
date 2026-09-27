import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../data/salonData';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="relative py-24 sm:py-32 bg-[#0a0907] border-t border-[#1c1a16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[1px] bg-[#c5a059]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-medium font-['Cinzel']">
              Client Commendations
            </span>
            <span className="w-6 h-[1px] bg-[#c5a059]" />
          </div>
          <h2 className="font-['Cinzel'] text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#fbf8f0] mb-4 [text-wrap:balance]">
            What Our Clients Say
          </h2>
          <p className="text-sm sm:text-base text-[#a8a193] font-light max-w-xl mx-auto leading-relaxed">
            Over 15,000 discerning gentlemen trust our chairs before critical board meetings, private galas, and life milestones.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-6 sm:p-8 bg-[#12110e] border border-[#24221e] hover:border-[#c5a059]/40 flex flex-col justify-between transition-all duration-300 shadow-xl relative"
            >
              <div className="absolute top-6 right-6 text-[#292722]">
                <Quote className="w-10 h-10 stroke-[1]" />
              </div>

              <div>
                {/* 5-star rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#c5a059] text-[#c5a059]" />
                  ))}
                  <span className="ml-2 text-xs font-bold text-[#dec58b]">5.0</span>
                </div>

                {/* Review Quote */}
                <p className="text-xs sm:text-sm text-[#ded8cb] font-light italic leading-relaxed mb-6">
                  “{t.comment}”
                </p>
              </div>

              {/* Client Info footer */}
              <div className="pt-4 border-t border-[#1c1a16] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    referrerPolicy="no-referrer"
                    className="w-11 h-11 rounded-full object-cover border border-[#c5a059]/40"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-['Cinzel'] text-xs sm:text-sm font-bold uppercase tracking-wider text-[#f8f5ee]">
                        {t.name}
                      </span>
                      <span title="Verified Patron" className="inline-flex">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a059]" />
                      </span>
                    </div>
                    <span className="text-[11px] text-[#8e877a] block">{t.role}</span>
                  </div>
                </div>

                <div className="text-right hidden sm:block">
                  <span className="text-[10px] uppercase tracking-wider text-[#aa843f] block">
                    Service
                  </span>
                  <span className="text-xs text-[#cfc7b9] font-medium">
                    {t.serviceUsed}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
