import React, { useState, useEffect } from 'react';
import { Scissors, Menu, X, Calendar, Phone, Clock, ChevronRight } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: (serviceId?: string, barberId?: string) => void;
  savedBookingCount?: number;
  onViewSavedBookings?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  savedBookingCount = 0,
  onViewSavedBookings,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Barbers', href: '#barbers' },
    { label: 'Transformation', href: '#transformation' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0c0b09]/95 backdrop-blur-md border-b border-[#292722] py-3.5 shadow-2xl'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Wordmark */}
          <a
            href="#home"
            className="group flex items-center gap-3 text-left focus:outline-none"
          >
            <div className="w-10 h-10 rounded border border-[#c5a059]/40 bg-[#171614] flex items-center justify-center text-[#c5a059] group-hover:border-[#c5a059] transition-colors shadow-sm">
              <Scissors className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
            </div>
            <div className="flex flex-col">
              <span className="font-['Cinzel'] text-lg sm:text-xl font-bold tracking-[0.2em] text-[#f8f5ee] uppercase leading-none">
                The Gentlemen’s Cut
              </span>
              <span className="text-[10px] tracking-[0.3em] text-[#c5a059] uppercase mt-1 font-medium">
                Classic Style · Modern Confidence
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-xs uppercase tracking-[0.18em] text-[#d6d0c4] hover:text-[#c5a059] transition-colors relative py-1 focus:outline-none"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {savedBookingCount > 0 && onViewSavedBookings && (
              <button
                onClick={onViewSavedBookings}
                className="relative p-2.5 bg-[#141310] border border-[#2e2b25] hover:border-[#c5a059] text-[#dec58b] transition-colors flex items-center justify-center"
                title={`View ${savedBookingCount} active reservation${savedBookingCount > 1 ? 's' : ''}`}
                aria-label="View reserved appointments"
              >
                <Calendar className="w-4 h-4 text-[#c5a059]" />
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#c5a059] text-[#0c0b09] text-[10px] font-bold flex items-center justify-center font-mono shadow">
                  {savedBookingCount}
                </span>
              </button>
            )}

            <button
              onClick={() => onOpenBooking()}
              className="relative group overflow-hidden px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#f8f5ee] border border-[#c5a059] bg-[#1a1814] hover:bg-[#c5a059] hover:text-[#0c0b09] transition-all duration-300 shadow-lg shadow-[#c5a059]/10"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Book Now</span>
                <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => onOpenBooking()}
              className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#0c0b09] bg-[#c5a059] rounded"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#d6d0c4] hover:text-[#c5a059] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-0 right-0 bottom-0 w-[290px] bg-[#0f0e0c] border-l border-[#292722] p-6 flex flex-col justify-between shadow-2xl z-10">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#292722]">
                <div className="flex items-center gap-2">
                  <Scissors className="w-5 h-5 text-[#c5a059]" />
                  <span className="font-['Cinzel'] text-sm font-bold tracking-widest text-[#f8f5ee]">
                    The Gentlemen's Cut
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-[#9e9689] hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-4 mt-6">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.href)}
                    className="text-left text-sm uppercase tracking-widest text-[#d6d0c4] hover:text-[#c5a059] py-1 border-b border-[#1c1a16] transition-colors"
                  >
                    {link.label}
                  </button>
                ))}

                {savedBookingCount > 0 && onViewSavedBookings && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onViewSavedBookings();
                    }}
                    className="flex items-center gap-2 mt-2 text-left text-xs uppercase tracking-wider text-[#dec58b] py-2"
                  >
                    <Calendar className="w-4 h-4 text-[#c5a059]" />
                    <span>My Bookings ({savedBookingCount})</span>
                  </button>
                )}
              </nav>
            </div>

            <div className="pt-6 border-t border-[#292722] space-y-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#0c0b09] bg-[#c5a059] hover:bg-[#dec58b] transition-colors text-center"
              >
                Book Appointment
              </button>

              <div className="space-y-1.5 text-[11px] text-[#9e9689]">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>+91 98200 45890</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Mon – Sat: 9:00 AM – 9:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
