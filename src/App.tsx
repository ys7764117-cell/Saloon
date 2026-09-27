/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustStats } from './components/TrustStats';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { BarbersSection } from './components/BarbersSection';
import { BeforeAfterSection } from './components/BeforeAfterSection';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { CtaBanner } from './components/CtaBanner';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BookingSystem } from './components/BookingSystem';
import { SavedBookingsModal } from './components/SavedBookingsModal';
import { ConfirmedBooking } from './types/booking';
import { Check, X, Calendar, Sparkles } from 'lucide-react';

export default function App() {
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);
  const [selectedBarberId, setSelectedBarberId] = useState<string | undefined>(undefined);
  const [isSectionHighlighted, setIsSectionHighlighted] = useState(false);

  // Saved bookings from localStorage
  const [savedBookings, setSavedBookings] = useState<ConfirmedBooking[]>([]);
  const [isSavedBookingsOpen, setIsSavedBookingsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load saved bookings on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('gentlemens_cut_bookings');
      if (stored) {
        setSavedBookings(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleOpenBooking = (serviceId?: string, barberId?: string) => {
    if (serviceId) setSelectedServiceId(serviceId);
    if (barberId) setSelectedBarberId(barberId);

    // Smoothly scroll to the single dedicated booking section
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
      setIsSectionHighlighted(true);
      setTimeout(() => setIsSectionHighlighted(false), 2000);
    }
  };

  const handleExploreServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookingConfirmed = (booking: ConfirmedBooking) => {
    setSavedBookings((prev) => [booking, ...prev]);
    showToast(`Appointment confirmed: ${booking.bookingId} for ${booking.service.name}`);
  };

  const handleCancelBooking = (bookingId: string) => {
    const updated = savedBookings.filter((b) => b.bookingId !== bookingId);
    setSavedBookings(updated);
    try {
      localStorage.setItem('gentlemens_cut_bookings', JSON.stringify(updated));
    } catch {
      // ignore
    }
    showToast(`Reservation ${bookingId} cancelled.`);
  };

  return (
    <div className="min-h-screen bg-[#0c0b09] text-[#e8e4dc] flex flex-col font-['Plus_Jakarta_Sans'] selection:bg-[#c5a059]/30 selection:text-[#f8f5ee]">
      {/* Sticky Luxury Navbar */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        savedBookingCount={savedBookings.length}
        onViewSavedBookings={() => setIsSavedBookingsOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onExploreServices={handleExploreServices}
        />

        {/* Trust & Quantitative Stats */}
        <TrustStats />

        {/* About Section */}
        <AboutSection onOpenBooking={() => handleOpenBooking()} />

        {/* Services & Featured Package */}
        <ServicesSection
          onSelectService={(serviceId) => handleOpenBooking(serviceId)}
        />

        {/* Embedded Luxury Pre-Booking Appointment Section (Single unified booking hub) */}
        <section id="booking" className="py-24 sm:py-32 bg-[#090807] border-t border-[#1c1a16] relative transition-all duration-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-6 h-[1px] bg-[#c5a059]" />
                <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-medium font-['Cinzel']">
                  Direct Pre-Booking
                </span>
                <span className="w-6 h-[1px] bg-[#c5a059]" />
              </div>
              <h2 className="font-['Cinzel'] text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#fbf8f0] mb-4 [text-wrap:balance]">
                Reserve Your Appointment
              </h2>
              <p className="text-xs sm:text-sm text-[#a8a193] font-light leading-relaxed">
                Select your service, preferred barber craftsman, date, and reserved time slot below.
              </p>
            </div>

            {/* Embedded Booking Widget with optional focus glow */}
            <div className={`transition-all duration-700 ${isSectionHighlighted ? 'ring-2 ring-[#c5a059] shadow-[0_0_40px_rgba(197,160,89,0.25)]' : ''}`}>
              <BookingSystem
                isOpenAsModal={false}
                initialServiceId={selectedServiceId}
                initialBarberId={selectedBarberId}
                onBookingConfirmed={handleBookingConfirmed}
              />
            </div>
          </div>
        </section>

        {/* Master Barbers Section */}
        <BarbersSection
          onSelectBarber={(barberId) => handleOpenBooking(undefined, barberId)}
        />

        {/* Before / After Transformation Interactive Showcase */}
        <BeforeAfterSection onBookNow={() => handleOpenBooking()} />

        {/* Masonry Gallery with Lightbox */}
        <GallerySection onBookNow={() => handleOpenBooking()} />

        {/* Client Reviews / Testimonials */}
        <ReviewsSection />

        {/* Premium CTA Banner */}
        <CtaBanner onOpenBooking={() => handleOpenBooking()} />

        {/* Flagship Contact & Location */}
        <ContactSection />
      </main>

      {/* Dark Luxury Footer */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* Saved Bookings Modal */}
      <SavedBookingsModal
        isOpen={isSavedBookingsOpen}
        onClose={() => setIsSavedBookingsOpen(false)}
        bookings={savedBookings}
        onCancelBooking={handleCancelBooking}
        onBookNew={() => {
          setIsSavedBookingsOpen(false);
          handleOpenBooking();
        }}
      />

      {/* Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#161512] border border-[#c5a059] px-4 py-3 shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300">
          <div className="w-6 h-6 rounded-full bg-[#c5a059] text-[#0c0b09] flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span className="text-xs text-[#f8f5ee] font-medium max-w-xs">
            {toastMessage}
          </span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-[#8e877a] hover:text-white p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
