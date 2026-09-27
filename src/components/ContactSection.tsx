import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, Instagram, Facebook, Compass, Check } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

export const ContactSection: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [inquiry, setInquiry] = useState({ name: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inquiry.name && inquiry.phone) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setInquiry({ name: '', phone: '', message: '' });
      }, 5000);
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-[#0c0b09] border-t border-[#1c1a16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[1px] bg-[#c5a059]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-medium font-['Cinzel']">
              The Flagship Salon
            </span>
            <span className="w-6 h-[1px] bg-[#c5a059]" />
          </div>
          <h2 className="font-['Cinzel'] text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#fbf8f0] mb-4 [text-wrap:balance]">
            Visit The Gentlemen’s Cut
          </h2>
          <p className="text-sm sm:text-base text-[#a8a193] font-light max-w-xl mx-auto leading-relaxed">
            Conveniently situated in the heart of the Financial District with dedicated valet parking and quiet client privacy.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Salon Information & Hours */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-[#12110e] border border-[#24221e] p-6 sm:p-8 shadow-xl">
              <h3 className="font-['Cinzel'] text-xl font-bold uppercase text-[#f8f5ee] mb-6 border-b border-[#1c1a16] pb-4">
                Location & Direct Concierge
              </h3>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-[#181714] border border-[#3b3731] flex items-center justify-center text-[#c5a059] shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-[#8e877a] mb-1 font-semibold">
                      Flagship Address
                    </div>
                    <div className="text-sm text-[#ded8cb] leading-relaxed">
                      {SALON_INFO.address}
                    </div>
                    <div className="text-xs text-[#a8a193] mt-1">
                      Private Valet Parking Available at South Gate
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-[#181714] border border-[#3b3731] flex items-center justify-center text-[#c5a059] shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-[#8e877a] mb-1 font-semibold">
                      Telephone & WhatsApp
                    </div>
                    <div className="text-sm text-[#ded8cb] font-mono">
                      {SALON_INFO.phone}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-[#181714] border border-[#3b3731] flex items-center justify-center text-[#c5a059] shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-[#8e877a] mb-1 font-semibold">
                      Electronic Mail
                    </div>
                    <div className="text-sm text-[#ded8cb]">
                      {SALON_INFO.email}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Get Directions & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 mt-6 border-t border-[#1c1a16]">
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 px-4 bg-[#c5a059] hover:bg-[#dec58b] text-[#0c0b09] font-bold text-xs uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2"
                >
                  <Compass className="w-4 h-4" />
                  <span>Get Directions</span>
                </a>

                <a
                  href={`https://wa.me/${SALON_INFO.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 px-4 bg-[#1b1915] hover:bg-[#25221c] border border-[#3b3731] hover:border-[#25D366] text-[#f8f5ee] text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-[#25D366]" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>
            </div>

            {/* Opening Hours Card */}
            <div className="bg-[#12110e] border border-[#24221e] p-6 sm:p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-5 h-5 text-[#c5a059]" />
                <h3 className="font-['Cinzel'] text-lg font-bold uppercase text-[#f8f5ee]">
                  Operating Hours
                </h3>
              </div>

              <div className="space-y-3">
                {SALON_INFO.hours.map((h) => (
                  <div
                    key={h.days}
                    className="flex items-center justify-between py-2 border-b border-[#1c1a16] text-xs"
                  >
                    <span className="text-[#cfc7b9] font-medium">{h.days}</span>
                    <span className="text-[#dec58b] font-mono">{h.time}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-4 text-xs text-[#8e877a]">
                <span>Follow our journal:</span>
                <div className="flex items-center gap-3">
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-[#c5a059] hover:text-white transition-colors" aria-label="Instagram">
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-[#c5a059] hover:text-white transition-colors" aria-label="Facebook">
                    <Facebook className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Map Preview + Quick Inquiry */}
          <div className="lg:col-span-6 space-y-6">
            {/* Visual Map Representation */}
            <div className="relative h-64 sm:h-72 bg-[#12110e] border border-[#24221e] overflow-hidden shadow-xl group">
              {/* Map Dark Graphic Mock */}
              <div className="absolute inset-0 bg-[#0d0c0a] flex items-center justify-center p-6 text-center">
                <div className="space-y-3 max-w-sm">
                  <div className="w-12 h-12 rounded-full bg-[#181714] border border-[#c5a059] flex items-center justify-center text-[#c5a059] mx-auto shadow-xl animate-pulse">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="font-['Cinzel'] text-base font-bold text-[#f8f5ee]">
                    High Street Galleria · Suite 402
                  </div>
                  <p className="text-xs text-[#8e877a]">
                    Latitude 19.0760° N, Longitude 72.8777° E. 5 minutes from Financial Hub Central Metro.
                  </p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block text-xs uppercase tracking-[0.2em] font-bold text-[#dec58b] hover:text-white border-b border-[#c5a059] pb-0.5 pt-1"
                  >
                    Open Live Interactive Google Maps →
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Inquiry Form */}
            <div className="bg-[#12110e] border border-[#24221e] p-6 sm:p-8 shadow-xl">
              <h3 className="font-['Cinzel'] text-lg font-bold uppercase text-[#f8f5ee] mb-2">
                Have A Special Requirement?
              </h3>
              <p className="text-xs text-[#8e877a] mb-5 font-light">
                For wedding party grooming, corporate private hire, or styling consultations, send a quick note to our head concierge.
              </p>

              {formSubmitted ? (
                <div className="p-4 bg-[#1a1814] border border-[#c5a059] text-center space-y-2">
                  <div className="w-8 h-8 rounded-full bg-[#c5a059] text-[#0c0b09] flex items-center justify-center mx-auto">
                    <Check className="w-5 h-5 stroke-[3]" />
                  </div>
                  <div className="font-['Cinzel'] text-sm font-bold text-[#f8f5ee]">
                    Inquiry Received
                  </div>
                  <p className="text-xs text-[#bfb8aa]">
                    Our salon manager will contact you within 2 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#8e877a] mb-1.5 font-medium">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={inquiry.name}
                        onChange={(e) => setInquiry({ ...inquiry, name: e.target.value })}
                        placeholder="e.g. Arjun Kapoor"
                        className="w-full bg-[#181714] border border-[#2e2b25] focus:border-[#c5a059] text-xs text-[#f8f5ee] px-3.5 py-2.5 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#8e877a] mb-1.5 font-medium">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={inquiry.phone}
                        onChange={(e) => setInquiry({ ...inquiry, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full bg-[#181714] border border-[#2e2b25] focus:border-[#c5a059] text-xs text-[#f8f5ee] px-3.5 py-2.5 focus:outline-none transition-colors font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#8e877a] mb-1.5 font-medium">
                      Event / Inquiry Details
                    </label>
                    <textarea
                      rows={3}
                      value={inquiry.message}
                      onChange={(e) => setInquiry({ ...inquiry, message: e.target.value })}
                      placeholder="e.g. Groom party reservation for 5 on Nov 15th..."
                      className="w-full bg-[#181714] border border-[#2e2b25] focus:border-[#c5a059] text-xs text-[#f8f5ee] px-3.5 py-2.5 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#181714] hover:bg-[#c5a059] hover:text-[#0c0b09] border border-[#3b3731] hover:border-[#c5a059] text-[#dec58b] text-xs uppercase tracking-[0.2em] font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
