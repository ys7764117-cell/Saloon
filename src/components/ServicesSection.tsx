import React, { useState } from 'react';
import { Clock, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { SERVICES, GENTLEMANS_EXPERIENCE_PACKAGE, PACKAGE_IMAGE } from '../data/salonData';
import { Service } from '../types/booking';

interface ServicesSectionProps {
  onSelectService: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'haircut' | 'beard' | 'combo' | 'spa' | 'package'>('all');

  const filteredServices = activeCategory === 'all'
    ? SERVICES
    : SERVICES.filter((s) => s.category === activeCategory);

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'haircut', label: 'Haircuts' },
    { id: 'beard', label: 'Beard' },
    { id: 'combo', label: 'Combos' },
    { id: 'spa', label: 'Spa & Massage' },
    { id: 'package', label: 'Packages' },
  ] as const;

  return (
    <section id="services" className="relative py-24 sm:py-32 bg-[#0a0907] border-t border-[#1c1a16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[1px] bg-[#c5a059]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-medium font-['Cinzel']">
              Tailored Grooming Menu
            </span>
            <span className="w-6 h-[1px] bg-[#c5a059]" />
          </div>
          <h2 className="font-['Cinzel'] text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#fbf8f0] mb-4 [text-wrap:balance]">
            Our Signature Services
          </h2>
          <p className="text-sm sm:text-base text-[#a8a193] font-light max-w-xl mx-auto leading-relaxed">
            Every appointment begins with a personal profile consultation, ensuring your cut matches your face shape, lifestyle, and texture.
          </p>

          {/* Interactive Category Segmented Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8 p-1.5 bg-[#12110e] border border-[#24221e] max-w-xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 sm:px-4 py-2 text-xs uppercase tracking-wider font-medium transition-all duration-200 focus:outline-none ${
                  activeCategory === cat.id
                    ? 'bg-[#c5a059] text-[#0c0b09] shadow-sm font-semibold'
                    : 'text-[#9e9689] hover:text-[#f8f5ee]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Signature Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredServices.map((service: Service) => (
            <div
              key={service.id}
              className="group relative bg-[#12110e] border border-[#24221e] hover:border-[#c5a059]/60 flex flex-col justify-between transition-all duration-300 shadow-xl overflow-hidden"
            >
              {/* Image Container with Dark Vignette */}
              <div className="relative h-52 sm:h-56 overflow-hidden bg-[#181714]">
                <img
                  src={service.image}
                  alt={service.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12110e] via-transparent to-black/30" />

                {/* Popular Tag */}
                {service.popular && (
                  <div className="absolute top-3 right-3 bg-[#c5a059] text-[#0c0b09] px-2.5 py-1 text-[10px] uppercase tracking-widest font-bold shadow-md">
                    Signature Choice
                  </div>
                )}

                {/* Duration Badge */}
                <div className="absolute bottom-3 left-3 bg-[#0c0b09]/85 backdrop-blur-sm border border-[#292722] px-2.5 py-1 flex items-center gap-1.5 text-[11px] text-[#dec58b]">
                  <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>{service.duration} mins</span>
                </div>
              </div>

              {/* Service Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline justify-between gap-2 mb-2">
                    <h3 className="font-['Cinzel'] text-lg font-bold uppercase tracking-wider text-[#f8f5ee] group-hover:text-[#dec58b] transition-colors">
                      {service.name}
                    </h3>
                    <div className="font-['Cinzel'] text-xl font-bold text-[#c5a059] shrink-0 tabular-nums">
                      ₹{service.price.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <p className="text-xs text-[#a8a193] font-light leading-relaxed mb-5">
                    {service.description}
                  </p>

                  {/* Highlights Bullet List */}
                  {service.features && (
                    <ul className="space-y-2 mb-6 border-t border-[#1c1a16] pt-4">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-[11px] text-[#8e877a]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Book Now Button */}
                <button
                  onClick={() => onSelectService(service.id)}
                  className="w-full py-3 px-4 bg-[#181714] border border-[#33302b] hover:border-[#c5a059] group-hover:bg-[#c5a059] group-hover:text-[#0c0b09] text-xs uppercase tracking-[0.2em] font-semibold text-[#dec58b] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Book Now</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Package: The Gentleman's Experience */}
        <div className="relative bg-[#141310] border border-[#c5a059]/40 p-6 sm:p-10 lg:p-12 shadow-2xl overflow-hidden">
          {/* Subtle gold corner accents */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#c5a059]/20 to-transparent pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Visual Column */}
            <div className="lg:col-span-5 relative order-2 lg:order-1">
              <div className="relative overflow-hidden bg-[#0c0b09] border border-[#292722]">
                <img
                  src={PACKAGE_IMAGE}
                  alt="The Gentleman's Experience ritual items"
                  referrerPolicy="no-referrer"
                  className="w-full h-[280px] sm:h-[340px] object-cover object-center filter contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
                <div className="absolute bottom-4 left-4 bg-[#0c0b09]/90 backdrop-blur-sm border border-[#c5a059]/50 px-3 py-1.5 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#c5a059]" />
                  <span className="text-[11px] font-['Cinzel'] uppercase tracking-widest text-[#f8f5ee]">
                    The Royal Ritual
                  </span>
                </div>
              </div>
            </div>

            {/* Details Column */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#c5a059] font-medium font-['Cinzel']">
                  Featured Signature Package
                </span>
              </div>

              <div className="flex flex-wrap items-baseline justify-between gap-4 mb-4">
                <h3 className="font-['Cinzel'] text-2xl sm:text-3xl lg:text-4xl font-bold uppercase text-[#fbf8f0]">
                  The Gentleman’s Experience
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="font-['Cinzel'] text-3xl sm:text-4xl font-bold text-[#c5a059] tabular-nums">
                    ₹{GENTLEMANS_EXPERIENCE_PACKAGE.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-[#8e877a] uppercase tracking-wider">
                    / 105 Min
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#bfb8aa] font-light leading-relaxed mb-6">
                Our pinnacle grooming ceremony designed for the man who values thoroughness over haste. A complete 6-stage ritual in private VIP station with single malt whiskey or single origin espresso.
              </p>

              {/* 6 Included Items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {GENTLEMANS_EXPERIENCE_PACKAGE.features?.map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0" />
                    <span className="text-xs text-[#d6d0c4] font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onSelectService(GENTLEMANS_EXPERIENCE_PACKAGE.id)}
                  className="px-8 py-4 bg-[#c5a059] hover:bg-[#dec58b] text-[#0c0b09] font-bold text-xs uppercase tracking-[0.22em] transition-all duration-300 shadow-xl shadow-[#c5a059]/20 flex items-center gap-3"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Book This Experience</span>
                </button>

                <div className="text-[11px] text-[#8e877a] tracking-wide">
                  Limited slots daily · Dedicated VIP Master Station
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
