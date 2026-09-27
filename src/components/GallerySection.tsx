import React, { useState } from 'react';
import { Maximize2, X, Scissors, Eye } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/salonData';
import { GalleryItem } from '../types/booking';

export const GallerySection: React.FC<{ onBookNow: () => void }> = ({ onBookNow }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Haircuts', 'Fades', 'Beard', 'Styling', 'Grooming', 'Salon'];

  const filteredItems = selectedCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <section id="gallery" className="relative py-24 sm:py-32 bg-[#0c0b09] border-t border-[#1c1a16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[1px] bg-[#c5a059]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-medium font-['Cinzel']">
              Editorial Portfolio
            </span>
            <span className="w-6 h-[1px] bg-[#c5a059]" />
          </div>
          <h2 className="font-['Cinzel'] text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#fbf8f0] mb-4 [text-wrap:balance]">
            Craftsmanship In Focus
          </h2>
          <p className="text-sm sm:text-base text-[#a8a193] font-light max-w-xl mx-auto leading-relaxed">
            A curated lookbook of our signature fades, bespoke beard alignments, and the tranquil ambience of our private salon floor.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-8 p-1.5 bg-[#12110e] border border-[#24221e] max-w-2xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 sm:px-4 py-1.5 text-xs uppercase tracking-wider font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#c5a059] text-[#0c0b09] font-semibold'
                    : 'text-[#9e9689] hover:text-[#f8f5ee]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group relative h-80 overflow-hidden bg-[#141310] border border-[#24221e] hover:border-[#c5a059]/60 cursor-pointer transition-all duration-300 shadow-xl"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out filter grayscale-[15%] group-hover:grayscale-0"
              />
              {/* Dark luxury overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

              {/* Bottom details and Category badge */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start">
                  <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest bg-[#c5a059] text-[#0c0b09]">
                    {item.category}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#12110e]/80 border border-[#3b3731] flex items-center justify-center text-[#dec58b] opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h3 className="font-['Cinzel'] text-base font-bold text-[#f8f5ee] uppercase tracking-wider mb-1 group-hover:text-[#dec58b] transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-[#8e877a]">
                    <span>Crafted by {item.barberName}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#12110e] border border-[#3b3731] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/70 border border-[#3b3731] flex items-center justify-center text-[#f8f5ee] hover:text-[#c5a059]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="md:col-span-8 bg-black flex items-center justify-center max-h-[70vh]">
                <img
                  src={activeItem.imageUrl}
                  alt={activeItem.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[70vh] w-full object-contain"
                />
              </div>

              <div className="md:col-span-4 p-6 sm:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-[#24221e]">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#c5a059] block mb-2 font-['Cinzel']">
                    {activeItem.category} Showcase
                  </span>
                  <h3 className="font-['Cinzel'] text-xl font-bold uppercase text-[#f8f5ee] mb-3">
                    {activeItem.title}
                  </h3>
                  <p className="text-xs text-[#9e9689] leading-relaxed mb-4">
                    Artisan execution by {activeItem.barberName}. Every line and gradation is tailored to the client’s hair density and cranial shape.
                  </p>
                </div>

                <div className="pt-6 border-t border-[#24221e] space-y-3">
                  <button
                    onClick={() => {
                      setActiveItem(null);
                      onBookNow();
                    }}
                    className="w-full py-3 bg-[#c5a059] hover:bg-[#dec58b] text-[#0c0b09] font-bold text-xs uppercase tracking-[0.2em] transition-colors"
                  >
                    Request Similar Style
                  </button>
                  <button
                    onClick={() => setActiveItem(null)}
                    className="w-full py-2.5 text-xs text-[#8e877a] hover:text-[#f8f5ee] uppercase tracking-wider"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
