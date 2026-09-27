import React, { useState } from 'react';
import { Sparkles, SlidersHorizontal, Check } from 'lucide-react';
import { FADE_DETAIL_IMAGE, ABOUT_IMAGE } from '../data/salonData';

export const BeforeAfterSection: React.FC<{ onBookNow: () => void }> = ({ onBookNow }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const [activeTab, setActiveTab] = useState<'fade' | 'beard'>('fade');

  return (
    <section id="transformation" className="relative py-24 sm:py-32 bg-[#090807] border-t border-[#1c1a16] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[1px] bg-[#c5a059]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-medium font-['Cinzel']">
              Client Transformations
            </span>
            <span className="w-6 h-[1px] bg-[#c5a059]" />
          </div>
          <h2 className="font-['Cinzel'] text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#fbf8f0] mb-4 [text-wrap:balance]">
            The Difference Is In The Details.
          </h2>
          <p className="text-sm sm:text-base text-[#a8a193] font-light max-w-xl mx-auto leading-relaxed">
            Slide horizontally to reveal the meticulous transition from neglected overgrowth to sharp, executive symmetry.
          </p>

          <div className="inline-flex items-center gap-2 p-1 bg-[#141310] border border-[#24221e] mt-6">
            <button
              onClick={() => { setActiveTab('fade'); setSliderPos(50); }}
              className={`px-4 py-1.5 text-xs uppercase tracking-wider font-semibold transition-colors ${
                activeTab === 'fade'
                  ? 'bg-[#c5a059] text-[#0c0b09]'
                  : 'text-[#9e9689] hover:text-[#f8f5ee]'
              }`}
            >
              Executive Taper Fade
            </button>
            <button
              onClick={() => { setActiveTab('beard'); setSliderPos(50); }}
              className={`px-4 py-1.5 text-xs uppercase tracking-wider font-semibold transition-colors ${
                activeTab === 'beard'
                  ? 'bg-[#c5a059] text-[#0c0b09]'
                  : 'text-[#9e9689] hover:text-[#f8f5ee]'
              }`}
            >
              Classic Scissor & Beard
            </button>
          </div>
        </div>

        {/* Interactive Comparison Container */}
        <div className="max-w-4xl mx-auto bg-[#12110e] border border-[#292722] p-4 sm:p-8 shadow-2xl">
          <div className="relative h-[380px] sm:h-[480px] w-full overflow-hidden select-none touch-none">
            {/* AFTER IMAGE (Bottom full layer) */}
            <img
              src={activeTab === 'fade' ? FADE_DETAIL_IMAGE : ABOUT_IMAGE}
              alt="After Gentlemen's Cut transformation"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center filter contrast-105"
            />
            <div className="absolute top-4 right-4 bg-[#c5a059] text-[#0c0b09] px-3 py-1 text-[11px] font-bold uppercase tracking-widest shadow-lg">
              After: Finished Precision
            </div>

            {/* BEFORE IMAGE (Top clipped layer) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <img
                src={activeTab === 'fade' ? ABOUT_IMAGE : FADE_DETAIL_IMAGE}
                alt="Before haircut transformation"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-center filter brightness-75 contrast-90 grayscale-[40%]"
                style={{
                  width: '100%',
                  maxWidth: 'none',
                  minWidth: '100%',
                }}
              />
              <div className="absolute top-4 left-4 bg-[#141310]/90 backdrop-blur-sm border border-[#3b3731] text-[#dec58b] px-3 py-1 text-[11px] font-bold uppercase tracking-widest shadow-lg">
                Before: 8 Weeks Overgrowth
              </div>
            </div>

            {/* Split Divider Line & Draggable Handle */}
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-[#c5a059] cursor-ew-resize z-20"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#0c0b09] border-2 border-[#c5a059] flex items-center justify-center text-[#c5a059] shadow-2xl">
                <SlidersHorizontal className="w-4 h-4" />
              </div>
            </div>

            {/* Range Input for accessibility and touch drag */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              aria-label="Before and after transformation slider"
              className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-30"
            />
          </div>

          {/* Transformation Breakdown Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-[#24221e]">
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#1b1914] border border-[#c5a059] flex items-center justify-center text-[#c5a059] shrink-0 mt-0.5">
                <Check className="w-3 h-3" />
              </span>
              <div>
                <div className="text-xs font-semibold text-[#f8f5ee]">Seamless Low Taper</div>
                <div className="text-[11px] text-[#8e877a]">Zero-gap clipper fading with soft gradient drop.</div>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#1b1914] border border-[#c5a059] flex items-center justify-center text-[#c5a059] shrink-0 mt-0.5">
                <Check className="w-3 h-3" />
              </span>
              <div>
                <div className="text-xs font-semibold text-[#f8f5ee]">Straight Razor Edging</div>
                <div className="text-[11px] text-[#8e877a]">Surgical cheek and temple lines with hot foam finish.</div>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#1b1914] border border-[#c5a059] flex items-center justify-center text-[#c5a059] shrink-0 mt-0.5">
                <Check className="w-3 h-3" />
              </span>
              <div>
                <div className="text-xs font-semibold text-[#f8f5ee]">Textured Weight Removal</div>
                <div className="text-[11px] text-[#8e877a]">Japanese shear point-cutting for natural movement.</div>
              </div>
            </div>
          </div>

          {/* Prompt to book */}
          <div className="mt-8 text-center">
            <button
              onClick={onBookNow}
              className="px-6 py-3 bg-[#c5a059] hover:bg-[#dec58b] text-[#0c0b09] font-bold text-xs uppercase tracking-[0.2em] transition-colors shadow-lg"
            >
              Get Your Transformation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
