import React, { useState } from 'react';
import { Check, ArrowRight, ShieldCheck, Sparkles, X } from 'lucide-react';
import { ABOUT_IMAGE } from '../data/salonData';

interface AboutSectionProps {
  onOpenBooking: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenBooking }) => {
  const [storyModalOpen, setStoryModalOpen] = useState(false);

  const pillars = [
    {
      title: 'Precision',
      desc: 'Micro-scissor grading and facial symmetry mapping tailored specifically to bone structure.',
    },
    {
      title: 'Experienced Barbers',
      desc: 'Master craftsmen with combined decades of rigorous European and bespoke barber training.',
    },
    {
      title: 'Premium Products',
      desc: 'Organic clay, Italian shave soaps, cedarwood oils, and sulfate-free hair cleansers.',
    },
    {
      title: 'Personalized Service',
      desc: 'Unhurried one-on-one appointments with complimentary roast espresso and whiskey service.',
    },
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32 bg-[#0c0b09] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Atmospheric Visual Block */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Outer decorative gold accent border */}
              <div className="absolute -inset-3 sm:-inset-4 border border-[#c5a059]/30 rounded-none pointer-events-none transform -rotate-1 hidden sm:block" />

              <div className="relative overflow-hidden bg-[#181714] border border-[#292722] shadow-2xl">
                <img
                  src={ABOUT_IMAGE}
                  alt="Master Barber precision haircut at The Gentlemen's Cut"
                  referrerPolicy="no-referrer"
                  className="w-full h-[420px] sm:h-[500px] object-cover object-center filter grayscale-[15%] contrast-110 hover:grayscale-0 hover:scale-102 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                {/* Floating Corner Quality Seal */}
                <div className="absolute bottom-5 left-5 right-5 sm:right-auto bg-[#100f0c]/90 backdrop-blur-md border border-[#c5a059]/40 p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#1e1c18] border border-[#c5a059] flex items-center justify-center text-[#c5a059]">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[11px] tracking-[0.2em] uppercase text-[#c5a059] font-semibold">
                        Master Craftsmanship
                      </div>
                      <div className="text-xs text-[#ded8cb]">
                        Over 15,000 Precision Cuts Hand-Delivered
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Copy & Pillars */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Small Label */}
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-[1px] bg-[#c5a059]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-medium font-['Cinzel']">
                The Art of Gentleman’s Grooming
              </span>
            </div>

            {/* Main Section Heading */}
            <h2 className="font-['Cinzel'] text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#fbf8f0] leading-[1.15] mb-6 [text-wrap:balance]">
              Where Tradition Meets Modern Style.
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base text-[#bfb8aa] leading-relaxed mb-6 font-light">
              Founded in 2018, <strong className="text-[#f8f5ee] font-semibold">The Gentlemen’s Cut</strong> was born from a singular conviction: men’s grooming should not be an rushed chore, but a refined ritual of relaxation and self-respect.
            </p>
            <p className="text-sm sm:text-base text-[#bfb8aa] leading-relaxed mb-8 font-light">
              We blend classical heritage barbering—warm lather straight-razor shaves, steaming towels, and timeless tapered necklines—with modern contemporary texturing, scalp science, and bespoke styling. Here, every appointment is reserved solely for your focus.
            </p>

            {/* 4 Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="p-4 bg-[#141310] border border-[#24221e] hover:border-[#c5a059]/40 transition-colors"
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#1f1d18] border border-[#c5a059]/50 flex items-center justify-center text-[#c5a059] shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                    <h3 className="font-['Cinzel'] text-xs uppercase tracking-wider font-semibold text-[#f8f5ee]">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#8e877a] leading-normal pl-7">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setStoryModalOpen(true)}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#dec58b] hover:text-white transition-colors group py-2"
              >
                <span>Discover Our Story</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5 text-[#c5a059]" />
              </button>

              <button
                onClick={onOpenBooking}
                className="px-5 py-2.5 bg-[#1b1915] border border-[#c5a059] hover:bg-[#c5a059] hover:text-[#0c0b09] text-xs font-semibold uppercase tracking-[0.2em] transition-colors"
              >
                Reserve Chair
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Heritage Story Modal */}
      {storyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="relative max-w-2xl w-full bg-[#12110e] border border-[#3b3731] p-6 sm:p-10 shadow-2xl">
            <button
              onClick={() => setStoryModalOpen(false)}
              className="absolute top-5 right-5 text-[#8e877a] hover:text-[#f8f5ee] p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-[#c5a059] mb-3">
              <Sparkles className="w-4 h-4" />
              <span className="text-[11px] font-['Cinzel'] uppercase tracking-[0.25em]">
                The Heritage Story
              </span>
            </div>

            <h3 className="font-['Cinzel'] text-2xl font-bold uppercase text-[#f8f5ee] mb-4">
              The Gentleman’s Creed
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-[#bfb8aa] leading-relaxed">
              <p>
                In an era dominated by rapid 15-minute franchise haircuts, we created The Gentlemen’s Cut as an antidote to rush and mediocrity. We believe that how a man presents himself defines how he encounters the world.
              </p>
              <p>
                Every chair in our salon is custom-cast in antique iron and upholstered in rich harness leather. Every blade is sanitized and honed with clinical exactness. Our barbers undergo over 200 hours of precision grading before ever touching a client's hair.
              </p>
              <p>
                Whether preparing for a boardroom keynote, your wedding morning, or your weekly grooming ritual, you will leave with renewed sharpness, effortless confidence, and calm clarity.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#292722] flex items-center justify-between">
              <div>
                <div className="font-['Cinzel'] text-sm font-semibold text-[#f8f5ee]">
                  Arjun Sharma
                </div>
                <div className="text-[11px] text-[#c5a059]">Founder & Master Craftsman</div>
              </div>
              <button
                onClick={() => {
                  setStoryModalOpen(false);
                  onOpenBooking();
                }}
                className="px-5 py-2.5 bg-[#c5a059] text-[#0c0b09] text-xs uppercase tracking-wider font-bold hover:bg-[#dec58b] transition-colors"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
