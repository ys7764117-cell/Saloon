import React, { useState, useEffect, useMemo } from 'react';
import {
  Scissors,
  UserCheck,
  Calendar as CalendarIcon,
  Clock,
  User,
  FileCheck,
  ChevronLeft,
  ChevronRight,
  Check,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Download,
  Share2,
  X,
  Phone,
  Mail,
  Loader2,
  CalendarPlus,
  RefreshCw,
} from 'lucide-react';
import { SERVICES, GENTLEMANS_EXPERIENCE_PACKAGE, BARBERS } from '../data/salonData';
import { Service, Barber, ConfirmedBooking, CustomerInfo } from '../types/booking';

interface BookingSystemProps {
  isOpenAsModal?: boolean;
  onCloseModal?: () => void;
  initialServiceId?: string;
  initialBarberId?: string;
  onBookingConfirmed?: (booking: ConfirmedBooking) => void;
}

const ALL_SERVICES_CATALOG: Service[] = [
  ...SERVICES,
  GENTLEMANS_EXPERIENCE_PACKAGE,
];

// Time slot definitions
const MORNING_SLOTS = ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'];
const AFTERNOON_SLOTS = ['02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'];
const EVENING_SLOTS = ['06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM'];

// Month names
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const DAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export const BookingSystem: React.FC<BookingSystemProps> = ({
  isOpenAsModal = false,
  onCloseModal,
  initialServiceId,
  initialBarberId,
  onBookingConfirmed,
}) => {
  // Step state: 1 to 6 (1: Service, 2: Barber, 3: Date & Time, 4: Details, 5: Summary, 6: Confirmed)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Selections
  const [selectedServiceId, setSelectedServiceId] = useState<string>(initialServiceId || SERVICES[0].id);
  const [selectedBarberId, setSelectedBarberId] = useState<string>(initialBarberId || 'any');
  
  // Date selection state
  // Default to today or tomorrow
  const today = useMemo(() => new Date(), []);
  const [viewDate, setViewDate] = useState<Date>(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  });

  // Time slot selection
  const [selectedTime, setSelectedTime] = useState<string>('10:30 AM');

  // Customer form
  const [customer, setCustomer] = useState<CustomerInfo>({
    fullName: '',
    phone: '',
    email: '',
    notes: '',
    agreedToTerms: true,
  });

  // Validation errors
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  // Submission / Loading state
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<ConfirmedBooking | null>(null);

  // Sync initial props if changed
  useEffect(() => {
    if (initialServiceId) {
      setSelectedServiceId(initialServiceId);
      setConfirmedBooking(null);
      setCurrentStep(2); // Directly guide user to choose their preferred barber
    }
  }, [initialServiceId]);

  useEffect(() => {
    if (initialBarberId) {
      setSelectedBarberId(initialBarberId);
      setConfirmedBooking(null);
      setCurrentStep(3); // Directly guide user to choose date & time
    }
  }, [initialBarberId]);

  // Selected Service object
  const currentService = useMemo(() => {
    return ALL_SERVICES_CATALOG.find((s) => s.id === selectedServiceId) || ALL_SERVICES_CATALOG[0];
  }, [selectedServiceId]);

  // Selected Barber object
  const currentBarber = useMemo(() => {
    if (selectedBarberId === 'any') {
      return {
        id: 'any',
        name: 'Any Available Senior Barber',
        position: 'First Open Master Station',
        specialty: 'Next Available Senior Barber',
        experience: 'Guaranteed 5+ Years',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      };
    }
    return BARBERS.find((b) => b.id === selectedBarberId) || BARBERS[0];
  }, [selectedBarberId]);

  // Unavailable slots simulation based on date and time
  const isSlotDisabled = (slot: string) => {
    // Generate deterministic availability based on date string and slot
    const dateKey = `${selectedDate.getDate()}-${selectedDate.getMonth()}-${slot}`;
    const hash = dateKey.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    // 20% of slots are booked/unavailable to create realistic luxury scarcity
    return hash % 5 === 0;
  };

  // Calendar logic
  const daysInCurrentMonth = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const days: Array<{ date: Date | null; isCurrentMonth: boolean; isPast: boolean; isToday: boolean; isSelected: boolean }> = [];

    // Empty padding slots
    for (let i = 0; i < firstDayIndex; i++) {
      days.push({ date: null, isCurrentMonth: false, isPast: true, isToday: false, isSelected: false });
    }

    // Days of current month
    for (let d = 1; d <= lastDate; d++) {
      const dayDate = new Date(year, month, d);
      const isPast = dayDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const isToday =
        dayDate.getDate() === today.getDate() &&
        dayDate.getMonth() === today.getMonth() &&
        dayDate.getFullYear() === today.getFullYear();
      const isSelected =
        selectedDate &&
        dayDate.getDate() === selectedDate.getDate() &&
        dayDate.getMonth() === selectedDate.getMonth() &&
        dayDate.getFullYear() === selectedDate.getFullYear();

      days.push({ date: dayDate, isCurrentMonth: true, isPast, isToday, isSelected });
    }

    return days;
  }, [viewDate, selectedDate, today]);

  const handlePrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  // Customer validation
  const validateCustomerDetails = () => {
    const errors: { [key: string]: string } = {};

    if (!customer.fullName.trim()) {
      errors.fullName = 'Please enter your full name';
    } else if (customer.fullName.trim().length < 3) {
      errors.fullName = 'Full name must be at least 3 characters';
    }

    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    if (!customer.phone.trim()) {
      errors.phone = 'Please enter your mobile phone number';
    } else if (!phoneRegex.test(customer.phone.replace(/\s+/g, ''))) {
      errors.phone = 'Please enter a valid 10-digit phone number';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!customer.email.trim()) {
      errors.email = 'Please enter your email for appointment confirmation';
    } else if (!emailRegex.test(customer.email.trim())) {
      errors.email = 'Please enter a valid email address';
    }

    if (!customer.agreedToTerms) {
      errors.agreedToTerms = 'You must agree to the salon booking policy';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateCustomerDetails()) {
      setCurrentStep(5); // Proceed to Summary
    }
  };

  // Format date helper
  const formattedSelectedDate = useMemo(() => {
    return selectedDate.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }, [selectedDate]);

  // Final Confirmation Execution
  const handleConfirmReservation = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const generatedId = `GC-2026-${Math.floor(10000 + Math.random() * 90000)}`;
      const newBooking: ConfirmedBooking = {
        bookingId: generatedId,
        service: currentService,
        barber: currentBarber,
        date: formattedSelectedDate,
        time: selectedTime,
        customer,
        createdAt: new Date().toISOString(),
        status: 'Confirmed',
      };

      // Save to localStorage for persistence
      try {
        const existing = JSON.parse(localStorage.getItem('gentlemens_cut_bookings') || '[]');
        localStorage.setItem('gentlemens_cut_bookings', JSON.stringify([newBooking, ...existing]));
      } catch {
        // Safe fallback
      }

      setConfirmedBooking(newBooking);
      setIsProcessing(false);
      setCurrentStep(6);

      if (onBookingConfirmed) {
        onBookingConfirmed(newBooking);
      }
    }, 1200);
  };

  // Google Calendar URL Generator
  const getGoogleCalendarUrl = () => {
    if (!confirmedBooking) return '#';
    const title = encodeURIComponent(`The Gentlemen's Cut: ${confirmedBooking.service.name}`);
    const details = encodeURIComponent(
      `Appointment at The Gentlemen's Cut with ${confirmedBooking.barber.name}.\nBooking ID: ${confirmedBooking.bookingId}\nDuration: ${confirmedBooking.service.duration} mins\nPrice: ₹${confirmedBooking.service.price}`
    );
    const location = encodeURIComponent('The Gentlemen’s Cut, High Street Galleria, Suite 402');
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  // Download iCal (.ics) file
  const downloadIcsFile = () => {
    if (!confirmedBooking) return;
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//The Gentlemens Cut//Booking System//EN',
      'BEGIN:VEVENT',
      `SUMMARY:The Gentlemen's Cut - ${confirmedBooking.service.name}`,
      `DESCRIPTION:Appointment with ${confirmedBooking.barber.name}. Booking ID: ${confirmedBooking.bookingId}`,
      'LOCATION:The Gentlemen’s Cut, High Street Galleria, Suite 402',
      `DTSTART:${selectedDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${confirmedBooking.bookingId}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Reset for another booking
  const handleResetBooking = () => {
    setCurrentStep(1);
    setConfirmedBooking(null);
    setCustomer({
      fullName: '',
      phone: '',
      email: '',
      notes: '',
      agreedToTerms: true,
    });
  };

  const stepsList = [
    { num: 1, label: 'Service' },
    { num: 2, label: 'Barber' },
    { num: 3, label: 'Date & Time' },
    { num: 4, label: 'Details' },
    { num: 5, label: 'Summary' },
  ];

  return (
    <div className={`relative ${isOpenAsModal ? 'w-full' : 'max-w-5xl mx-auto'}`}>
      {/* Container Box with Dark Luxury Styling */}
      <div className="bg-[#12110e] border border-[#2e2b25] shadow-2xl overflow-hidden relative">
        {/* Modal Close Button if in modal mode */}
        {isOpenAsModal && onCloseModal && (
          <button
            onClick={onCloseModal}
            className="absolute top-4 right-4 z-30 p-2 text-[#8e877a] hover:text-[#f8f5ee] transition-colors"
            aria-label="Close booking modal"
          >
            <X className="w-6 h-6" />
          </button>
        )}

        {/* Top Header */}
        <div className="p-6 sm:p-8 bg-[#171613] border-b border-[#24221e] relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 mb-1">
                <span className="w-4 h-[1px] bg-[#c5a059]" />
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a059] font-medium font-['Cinzel']">
                  Bespoke Appointment System
                </span>
              </div>
              <h2 className="font-['Cinzel'] text-xl sm:text-2xl font-bold uppercase text-[#f8f5ee] tracking-wide">
                Reserve Your Chair
              </h2>
            </div>

            {/* Price & Duration Live Ticker if past step 1 */}
            {currentStep < 6 && (
              <div className="flex items-center gap-4 bg-[#0e0d0b] border border-[#292722] px-4 py-2 self-start sm:self-auto">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[#8e877a]">
                    Selected Service
                  </div>
                  <div className="text-xs font-bold text-[#f8f5ee] truncate max-w-[180px]">
                    {currentService.name}
                  </div>
                </div>
                <div className="border-l border-[#24221e] pl-4 text-right">
                  <div className="text-[10px] uppercase tracking-wider text-[#8e877a]">
                    Total
                  </div>
                  <div className="font-['Cinzel'] text-sm font-bold text-[#c5a059] tabular-nums">
                    ₹{currentService.price.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Stepper Progress Bar (Steps 1 to 5) */}
          {currentStep <= 5 && (
            <div className="mt-8 pt-6 border-t border-[#24221e]/70">
              <div className="grid grid-cols-5 gap-2 sm:gap-4">
                {stepsList.map((step) => {
                  const isCurrent = currentStep === step.num;
                  const isPassed = currentStep > step.num;

                  return (
                    <button
                      key={step.num}
                      type="button"
                      disabled={!isPassed && !isCurrent}
                      onClick={() => isPassed && setCurrentStep(step.num)}
                      className={`flex flex-col sm:flex-row items-center sm:items-center gap-1.5 sm:gap-2 text-left focus:outline-none transition-colors ${
                        isPassed ? 'cursor-pointer' : 'cursor-default'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[10px] font-bold border transition-colors ${
                          isCurrent
                            ? 'bg-[#c5a059] text-[#0c0b09] border-[#c5a059]'
                            : isPassed
                            ? 'bg-[#1e1c17] text-[#c5a059] border-[#c5a059]'
                            : 'bg-[#151412] text-[#69645b] border-[#292722]'
                        }`}
                      >
                        {isPassed ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : `0${step.num}`}
                      </div>
                      <span
                        className={`text-[10px] sm:text-xs uppercase tracking-wider font-medium hidden md:inline truncate ${
                          isCurrent
                            ? 'text-[#f8f5ee] font-bold'
                            : isPassed
                            ? 'text-[#ded8cb]'
                            : 'text-[#69645b]'
                        }`}
                      >
                        {step.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* STEP 1: SELECT SERVICE */}
        {currentStep === 1 && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-['Cinzel'] text-base sm:text-lg font-bold uppercase text-[#f8f5ee]">
                  Step 01 — Select Your Grooming Service
                </h3>
                <p className="text-xs text-[#8e877a] font-light">
                  Choose from our signature haircut, beard grooming, or comprehensive gentleman rituals.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ALL_SERVICES_CATALOG.map((service) => {
                const isSelected = selectedServiceId === service.id;
                return (
                  <div
                    key={service.id}
                    onClick={() => setSelectedServiceId(service.id)}
                    className={`p-4 border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#1c1a15] border-[#c5a059] shadow-lg ring-1 ring-[#c5a059]/40'
                        : 'bg-[#151411] border-[#292722] hover:border-[#3d3a33]'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected
                                ? 'border-[#c5a059] bg-[#c5a059]'
                                : 'border-[#423f37] bg-transparent'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 text-[#0c0b09] stroke-[3]" />}
                          </div>
                          <h4 className="font-['Cinzel'] text-sm font-bold text-[#f8f5ee] uppercase tracking-wide">
                            {service.name}
                          </h4>
                        </div>
                        <div className="font-['Cinzel'] text-sm font-bold text-[#c5a059] shrink-0 tabular-nums">
                          ₹{service.price.toLocaleString('en-IN')}
                        </div>
                      </div>

                      <p className="text-xs text-[#9e9689] leading-relaxed mb-3 pl-6 line-clamp-2">
                        {service.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-[#24221e] text-[11px] pl-6 text-[#8e877a]">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
                        <span>{service.duration} mins session</span>
                      </span>
                      {service.popular && (
                        <span className="text-[#dec58b] uppercase tracking-wider font-semibold">
                          ★ Most Booked
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Step Actions */}
            <div className="pt-6 border-t border-[#24221e] flex items-center justify-between">
              <div className="text-xs text-[#8e877a]">
                Selected: <strong className="text-[#dec58b]">{currentService.name}</strong> (₹{currentService.price}, {currentService.duration} min)
              </div>
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-7 py-3 bg-[#c5a059] hover:bg-[#dec58b] text-[#0c0b09] font-bold text-xs uppercase tracking-[0.2em] transition-all flex items-center gap-2"
              >
                <span>Continue to Barber</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: SELECT BARBER */}
        {currentStep === 2 && (
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="font-['Cinzel'] text-base sm:text-lg font-bold uppercase text-[#f8f5ee]">
                Step 02 — Select Your Craftsman
              </h3>
              <p className="text-xs text-[#8e877a] font-light">
                Choose a specific master stylist or select the first available senior chair for maximum flexibility.
              </p>
            </div>

            {/* ANY BARBER OPTION */}
            <div
              onClick={() => setSelectedBarberId('any')}
              className={`p-4 border cursor-pointer transition-all ${
                selectedBarberId === 'any'
                  ? 'bg-[#1c1a15] border-[#c5a059] shadow-lg ring-1 ring-[#c5a059]/40'
                  : 'bg-[#151411] border-[#292722] hover:border-[#3d3a33]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                      selectedBarberId === 'any'
                        ? 'border-[#c5a059] bg-[#c5a059]'
                        : 'border-[#423f37] bg-transparent'
                    }`}
                  >
                    {selectedBarberId === 'any' && <Check className="w-3 h-3 text-[#0c0b09] stroke-[3]" />}
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#201d18] border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059]">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-['Cinzel'] text-sm font-bold text-[#f8f5ee] uppercase tracking-wide">
                      Any Available Master Barber
                    </h4>
                    <span className="text-xs text-[#8e877a]">
                      Guaranteed matching with senior craftsman with earliest availability.
                    </span>
                  </div>
                </div>

                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#dec58b] bg-[#24221c] px-2.5 py-1 border border-[#3b3731] hidden sm:inline">
                  Fastest Scheduling
                </span>
              </div>
            </div>

            {/* BARBERS LIST */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {BARBERS.map((barber) => {
                const isSelected = selectedBarberId === barber.id;
                return (
                  <div
                    key={barber.id}
                    onClick={() => setSelectedBarberId(barber.id)}
                    className={`p-4 border cursor-pointer transition-all flex items-start gap-4 ${
                      isSelected
                        ? 'bg-[#1c1a15] border-[#c5a059] shadow-lg ring-1 ring-[#c5a059]/40'
                        : 'bg-[#151411] border-[#292722] hover:border-[#3d3a33]'
                    }`}
                  >
                    <div className="relative shrink-0">
                      <img
                        src={barber.avatar}
                        alt={barber.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded object-cover object-top border border-[#2e2b25]"
                      />
                      <div
                        className={`absolute -top-1.5 -left-1.5 w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected
                            ? 'border-[#c5a059] bg-[#c5a059]'
                            : 'border-[#423f37] bg-[#12110e]'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 text-[#0c0b09] stroke-[3]" />}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-1">
                        <h4 className="font-['Cinzel'] text-sm font-bold text-[#f8f5ee] uppercase truncate">
                          {barber.name}
                        </h4>
                        <span className="text-xs text-[#dec58b] font-bold shrink-0">
                          ★ {barber.rating}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#c5a059] font-medium mb-1">
                        {barber.position}
                      </div>
                      <div className="text-[11px] text-[#8e877a] mb-2 truncate">
                        {barber.specialty}
                      </div>
                      <div className="text-[10px] text-[#dec58b] uppercase tracking-wider font-mono">
                        {barber.experience}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation buttons */}
            <div className="pt-6 border-t border-[#24221e] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-5 py-2.5 text-xs uppercase tracking-wider text-[#a8a193] hover:text-[#f8f5ee] flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="px-7 py-3 bg-[#c5a059] hover:bg-[#dec58b] text-[#0c0b09] font-bold text-xs uppercase tracking-[0.2em] transition-all flex items-center gap-2"
              >
                <span>Continue to Date & Time</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: SELECT DATE & TIME SLOT */}
        {currentStep === 3 && (
          <div className="p-6 sm:p-8 space-y-8">
            <div>
              <h3 className="font-['Cinzel'] text-base sm:text-lg font-bold uppercase text-[#f8f5ee]">
                Step 03 — Select Date & Reserved Slot
              </h3>
              <p className="text-xs text-[#8e877a] font-light">
                Appointments are held exclusively for {currentService.duration} minutes. Please choose an open window.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Interactive Luxury Calendar */}
              <div className="lg:col-span-6 bg-[#161512] border border-[#292722] p-5 shadow-lg">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#24221e]">
                  <div className="flex items-center gap-2 font-['Cinzel'] text-sm font-bold uppercase text-[#f8f5ee]">
                    <CalendarIcon className="w-4 h-4 text-[#c5a059]" />
                    <span>
                      {MONTH_NAMES[viewDate.getMonth()]} {viewDate.getFullYear()}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={handlePrevMonth}
                      className="p-1.5 text-[#8e877a] hover:text-[#f8f5ee] hover:bg-[#201d18] rounded transition-colors"
                      aria-label="Previous month"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextMonth}
                      className="p-1.5 text-[#8e877a] hover:text-[#f8f5ee] hover:bg-[#201d18] rounded transition-colors"
                      aria-label="Next month"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Day Header */}
                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                  {DAY_NAMES.map((d) => (
                    <div key={d} className="text-[10px] uppercase font-bold text-[#8e877a] py-1">
                      {d}
                    </div>
                  ))}
                </div>

                {/* Dates Matrix */}
                <div className="grid grid-cols-7 gap-1 text-center">
                  {daysInCurrentMonth.map((dayObj, i) => {
                    if (!dayObj.date) {
                      return <div key={i} className="h-9" />;
                    }

                    const isDisabled = dayObj.isPast;
                    const isSelected = dayObj.isSelected;

                    return (
                      <button
                        key={i}
                        type="button"
                        disabled={isDisabled}
                        onClick={() => handleDateSelect(dayObj.date!)}
                        className={`h-9 w-full rounded-sm text-xs font-mono transition-all flex flex-col items-center justify-center relative ${
                          isDisabled
                            ? 'text-[#47433c] cursor-not-allowed bg-transparent'
                            : isSelected
                            ? 'bg-[#c5a059] text-[#0c0b09] font-bold shadow-md'
                            : 'text-[#ded8cb] hover:bg-[#26241e] hover:text-[#f8f5ee]'
                        } ${dayObj.isToday && !isSelected ? 'border border-[#c5a059]/60' : ''}`}
                      >
                        <span>{dayObj.date.getDate()}</span>
                        {dayObj.isToday && (
                          <span
                            className={`w-1 h-1 rounded-full absolute bottom-1 ${
                              isSelected ? 'bg-[#0c0b09]' : 'bg-[#c5a059]'
                            }`}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 pt-3 border-t border-[#24221e] flex items-center justify-between text-[11px] text-[#8e877a]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#c5a059]" />
                    <span>Selected Date</span>
                  </span>
                  <span className="text-[#ded8cb] font-medium">
                    {formattedSelectedDate}
                  </span>
                </div>
              </div>

              {/* Right Column: Time Slots */}
              <div className="lg:col-span-6 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#c5a059]" />
                    <span className="font-['Cinzel'] text-xs uppercase tracking-wider font-bold text-[#f8f5ee]">
                      Available Time Slots
                    </span>
                  </div>
                  <span className="text-[11px] text-[#8e877a]">
                    Duration: {currentService.duration} min
                  </span>
                </div>

                {/* Morning Slots */}
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[#a8a193] mb-2 font-semibold">
                    Morning (09:00 AM – 12:00 PM)
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {MORNING_SLOTS.map((slot) => {
                      const disabled = isSlotDisabled(slot);
                      const isSelected = selectedTime === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          disabled={disabled}
                          onClick={() => setSelectedTime(slot)}
                          className={`py-2 px-2 text-xs font-mono rounded-sm border transition-all text-center ${
                            disabled
                              ? 'bg-[#12110e] border-[#201d19] text-[#47433c] cursor-not-allowed line-through'
                              : isSelected
                              ? 'bg-[#c5a059] border-[#c5a059] text-[#0c0b09] font-bold shadow-md'
                              : 'bg-[#181714] border-[#292722] text-[#ded8cb] hover:border-[#c5a059]/60'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Afternoon Slots */}
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[#a8a193] mb-2 font-semibold">
                    Afternoon (02:00 PM – 05:00 PM)
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {AFTERNOON_SLOTS.map((slot) => {
                      const disabled = isSlotDisabled(slot);
                      const isSelected = selectedTime === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          disabled={disabled}
                          onClick={() => setSelectedTime(slot)}
                          className={`py-2 px-2 text-xs font-mono rounded-sm border transition-all text-center ${
                            disabled
                              ? 'bg-[#12110e] border-[#201d19] text-[#47433c] cursor-not-allowed line-through'
                              : isSelected
                              ? 'bg-[#c5a059] border-[#c5a059] text-[#0c0b09] font-bold shadow-md'
                              : 'bg-[#181714] border-[#292722] text-[#ded8cb] hover:border-[#c5a059]/60'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Evening Slots */}
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[#a8a193] mb-2 font-semibold">
                    Evening (06:00 PM – 08:30 PM)
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {EVENING_SLOTS.map((slot) => {
                      const disabled = isSlotDisabled(slot);
                      const isSelected = selectedTime === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          disabled={disabled}
                          onClick={() => setSelectedTime(slot)}
                          className={`py-2 px-2 text-xs font-mono rounded-sm border transition-all text-center ${
                            disabled
                              ? 'bg-[#12110e] border-[#201d19] text-[#47433c] cursor-not-allowed line-through'
                              : isSelected
                              ? 'bg-[#c5a059] border-[#c5a059] text-[#0c0b09] font-bold shadow-md'
                              : 'bg-[#181714] border-[#292722] text-[#ded8cb] hover:border-[#c5a059]/60'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Selection summary preview */}
                <div className="p-3 bg-[#181714] border border-[#2e2b25] flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[#8e877a] text-[10px] uppercase tracking-wider block">
                      Target Reservation
                    </span>
                    <span className="text-[#f8f5ee] font-semibold">
                      {formattedSelectedDate}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[#8e877a] text-[10px] uppercase tracking-wider block">
                      Slot Time
                    </span>
                    <span className="text-[#dec58b] font-mono font-bold">
                      {selectedTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="pt-6 border-t border-[#24221e] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-5 py-2.5 text-xs uppercase tracking-wider text-[#a8a193] hover:text-[#f8f5ee] flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="px-7 py-3 bg-[#c5a059] hover:bg-[#dec58b] text-[#0c0b09] font-bold text-xs uppercase tracking-[0.2em] transition-all flex items-center gap-2"
              >
                <span>Continue to Customer Details</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: CUSTOMER DETAILS FORM */}
        {currentStep === 4 && (
          <form onSubmit={handleDetailsSubmit} className="p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="font-['Cinzel'] text-base sm:text-lg font-bold uppercase text-[#f8f5ee]">
                Step 04 — Patron Contact & Verification
              </h3>
              <p className="text-xs text-[#8e877a] font-light">
                We send digital appointment passes and concierge arrival instructions via SMS and Email.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#8e877a] mb-1.5 font-semibold">
                  Full Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={customer.fullName}
                    onChange={(e) => {
                      setCustomer({ ...customer, fullName: e.target.value });
                      if (formErrors.fullName) setFormErrors({ ...formErrors, fullName: '' });
                    }}
                    placeholder="e.g. Yaser Sayed"
                    className={`w-full bg-[#161512] border px-4 py-3 text-xs text-[#f8f5ee] focus:outline-none transition-colors ${
                      formErrors.fullName ? 'border-red-500/80 bg-red-950/10' : 'border-[#2e2b25] focus:border-[#c5a059]'
                    }`}
                  />
                  <User className="w-4 h-4 text-[#8e877a] absolute right-3.5 top-3.5 pointer-events-none" />
                </div>
                {formErrors.fullName && (
                  <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{formErrors.fullName}</span>
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#8e877a] mb-1.5 font-semibold">
                  Phone Number (Mobile for SMS Pass) *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={customer.phone}
                    onChange={(e) => {
                      setCustomer({ ...customer, phone: e.target.value });
                      if (formErrors.phone) setFormErrors({ ...formErrors, phone: '' });
                    }}
                    placeholder="+91 98200 45890"
                    className={`w-full bg-[#161512] border px-4 py-3 text-xs text-[#f8f5ee] font-mono focus:outline-none transition-colors ${
                      formErrors.phone ? 'border-red-500/80 bg-red-950/10' : 'border-[#2e2b25] focus:border-[#c5a059]'
                    }`}
                  />
                  <Phone className="w-4 h-4 text-[#8e877a] absolute right-3.5 top-3.5 pointer-events-none" />
                </div>
                {formErrors.phone && (
                  <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{formErrors.phone}</span>
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div className="md:col-span-2">
                <label className="block text-xs uppercase tracking-wider text-[#8e877a] mb-1.5 font-semibold">
                  Email Address (For Calendar Invite & Invoice) *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={customer.email}
                    onChange={(e) => {
                      setCustomer({ ...customer, email: e.target.value });
                      if (formErrors.email) setFormErrors({ ...formErrors, email: '' });
                    }}
                    placeholder="yaser.sayed@example.com"
                    className={`w-full bg-[#161512] border px-4 py-3 text-xs text-[#f8f5ee] focus:outline-none transition-colors ${
                      formErrors.email ? 'border-red-500/80 bg-red-950/10' : 'border-[#2e2b25] focus:border-[#c5a059]'
                    }`}
                  />
                  <Mail className="w-4 h-4 text-[#8e877a] absolute right-3.5 top-3.5 pointer-events-none" />
                </div>
                {formErrors.email && (
                  <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{formErrors.email}</span>
                  </p>
                )}
              </div>

              {/* Optional Notes */}
              <div className="md:col-span-2">
                <label className="block text-xs uppercase tracking-wider text-[#8e877a] mb-1.5 font-semibold">
                  Grooming Notes or Beverage Preference (Optional)
                </label>
                <textarea
                  rows={2}
                  value={customer.notes}
                  onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                  placeholder="e.g. Skin sensitive to hot blades, double espresso with splash of milk..."
                  className="w-full bg-[#161512] border border-[#2e2b25] focus:border-[#c5a059] px-4 py-3 text-xs text-[#f8f5ee] focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Agreement Checkbox */}
              <div className="md:col-span-2">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={customer.agreedToTerms}
                    onChange={(e) => {
                      setCustomer({ ...customer, agreedToTerms: e.target.checked });
                      if (formErrors.agreedToTerms) setFormErrors({ ...formErrors, agreedToTerms: '' });
                    }}
                    className="mt-0.5 accent-[#c5a059] w-4 h-4 rounded cursor-pointer"
                  />
                  <span className="text-xs text-[#a8a193]">
                    I agree to the salon’s booking terms. I understand that appointments are strictly reserved and cancellations must be made at least 2 hours in advance.
                  </span>
                </label>
                {formErrors.agreedToTerms && (
                  <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{formErrors.agreedToTerms}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="pt-6 border-t border-[#24221e] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="px-5 py-2.5 text-xs uppercase tracking-wider text-[#a8a193] hover:text-[#f8f5ee] flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="submit"
                className="px-7 py-3 bg-[#c5a059] hover:bg-[#dec58b] text-[#0c0b09] font-bold text-xs uppercase tracking-[0.2em] transition-all flex items-center gap-2"
              >
                <span>Continue to Confirmation</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 5: BOOKING SUMMARY */}
        {currentStep === 5 && (
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="font-['Cinzel'] text-base sm:text-lg font-bold uppercase text-[#f8f5ee]">
                Step 05 — Review Booking Summary
              </h3>
              <p className="text-xs text-[#8e877a] font-light">
                Please verify your appointment schedule before generating your official reservation token.
              </p>
            </div>

            {/* Luxury Summary Voucher */}
            <div className="bg-[#161512] border border-[#c5a059]/40 p-6 sm:p-8 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-[#292722] pb-4 mb-6">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a059] font-['Cinzel'] font-bold">
                    The Gentlemen’s Cut · Reservation Ticket
                  </span>
                  <h4 className="font-['Cinzel'] text-lg sm:text-xl font-bold uppercase text-[#f8f5ee] mt-1">
                    Your Appointment
                  </h4>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-wider text-[#8e877a] block">
                    Total Payable
                  </span>
                  <span className="font-['Cinzel'] text-2xl font-bold text-[#c5a059] tabular-nums">
                    ₹{currentService.price.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                {/* Service & Duration */}
                <div className="space-y-1">
                  <span className="text-[#8e877a] uppercase tracking-wider text-[10px] block">
                    Selected Service
                  </span>
                  <div className="text-[#f8f5ee] font-semibold text-sm font-['Cinzel']">
                    {currentService.name}
                  </div>
                  <div className="text-[#dec58b] flex items-center gap-1 pt-0.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{currentService.duration} Minutes Duration</span>
                  </div>
                </div>

                {/* Barber Craftsman */}
                <div className="space-y-1">
                  <span className="text-[#8e877a] uppercase tracking-wider text-[10px] block">
                    Craftsman & Station
                  </span>
                  <div className="text-[#f8f5ee] font-semibold text-sm font-['Cinzel']">
                    {currentBarber.name}
                  </div>
                  <div className="text-[#dec58b]">
                    {currentBarber.position}
                  </div>
                </div>

                {/* Scheduled Date */}
                <div className="space-y-1">
                  <span className="text-[#8e877a] uppercase tracking-wider text-[10px] block">
                    Reserved Date
                  </span>
                  <div className="text-[#f8f5ee] font-semibold text-sm">
                    {formattedSelectedDate}
                  </div>
                </div>

                {/* Scheduled Time */}
                <div className="space-y-1">
                  <span className="text-[#8e877a] uppercase tracking-wider text-[10px] block">
                    Appointment Slot
                  </span>
                  <div className="text-[#c5a059] font-mono font-bold text-sm">
                    {selectedTime}
                  </div>
                </div>

                {/* Customer Details */}
                <div className="space-y-1">
                  <span className="text-[#8e877a] uppercase tracking-wider text-[10px] block">
                    Customer Name
                  </span>
                  <div className="text-[#ded8cb] font-medium">
                    {customer.fullName}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[#8e877a] uppercase tracking-wider text-[10px] block">
                    Phone & Email
                  </span>
                  <div className="text-[#ded8cb] font-mono">
                    {customer.phone}
                  </div>
                  <div className="text-[#8e877a] text-[11px]">
                    {customer.email}
                  </div>
                </div>
              </div>

              {customer.notes && (
                <div className="mt-6 pt-4 border-t border-[#292722] text-xs">
                  <span className="text-[#8e877a] text-[10px] uppercase tracking-wider block mb-1">
                    Special Requests
                  </span>
                  <p className="text-[#ded8cb] italic font-light">
                    “{customer.notes}”
                  </p>
                </div>
              )}
            </div>

            {/* Navigation & Final Confirm */}
            <div className="pt-6 border-t border-[#24221e] flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="w-full sm:w-auto px-5 py-2.5 text-xs uppercase tracking-wider text-[#a8a193] hover:text-[#f8f5ee] flex items-center justify-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>← Edit Booking</span>
              </button>

              <button
                type="button"
                disabled={isProcessing}
                onClick={handleConfirmReservation}
                className="w-full sm:w-auto px-9 py-4 bg-[#c5a059] hover:bg-[#dec58b] text-[#0c0b09] font-bold text-xs uppercase tracking-[0.25em] transition-all shadow-xl shadow-[#c5a059]/20 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing Reservation...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirm Pre-Booking</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: BOOKING CONFIRMATION SUCCESS SCREEN */}
        {currentStep === 6 && confirmedBooking && (
          <div className="p-6 sm:p-10 text-center space-y-6">
            {/* Elegant Check Icon with Pulse */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#1b1914] border-2 border-[#c5a059] flex items-center justify-center text-[#c5a059] mx-auto shadow-2xl animate-in zoom-in-75 duration-300">
              <Check className="w-8 h-8 sm:w-10 sm:h-10 stroke-[2.5]" />
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#c5a059] font-['Cinzel'] font-bold block mb-1">
                Reservation Confirmed
              </span>
              <h3 className="font-['Cinzel'] text-2xl sm:text-3xl font-bold uppercase text-[#f8f5ee] mb-2 [text-wrap:balance]">
                Your Appointment Is Confirmed
              </h3>
              <p className="text-xs sm:text-sm text-[#bfb8aa] max-w-md mx-auto font-light leading-relaxed">
                “Thank you for choosing The Gentlemen’s Cut. We look forward to welcoming you.”
              </p>
            </div>

            {/* Booking ID Plate */}
            <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-[#171613] border border-[#c5a059]/40 shadow-inner">
              <span className="text-xs uppercase tracking-wider text-[#8e877a]">
                Booking ID:
              </span>
              <span className="font-mono text-sm sm:text-base font-bold text-[#f8f5ee] tracking-widest text-[#dec58b]">
                {confirmedBooking.bookingId}
              </span>
            </div>

            {/* Confirmed Details Grid */}
            <div className="max-w-xl mx-auto bg-[#161512] border border-[#2e2b25] p-5 sm:p-6 text-left space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-[#24221e]">
                <span className="text-[#8e877a]">Service</span>
                <span className="font-bold text-[#f8f5ee]">{confirmedBooking.service.name}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#24221e]">
                <span className="text-[#8e877a]">Barber</span>
                <span className="font-bold text-[#f8f5ee]">{confirmedBooking.barber.name}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#24221e]">
                <span className="text-[#8e877a]">Date</span>
                <span className="font-mono text-[#ded8cb]">{confirmedBooking.date}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#24221e]">
                <span className="text-[#8e877a]">Time Slot</span>
                <span className="font-mono font-bold text-[#c5a059]">{confirmedBooking.time}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#24221e]">
                <span className="text-[#8e877a]">Duration</span>
                <span className="text-[#ded8cb]">{confirmedBooking.service.duration} Minutes</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-[#8e877a]">Total Fee</span>
                <span className="font-['Cinzel'] font-bold text-[#c5a059] text-sm tabular-nums">
                  ₹{confirmedBooking.service.price.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Notification notice */}
            <p className="text-xs text-[#a8a193]">
              A confirmation message and digital gate pass has been sent to{' '}
              <strong className="text-[#f8f5ee]">{confirmedBooking.customer.phone}</strong> and{' '}
              <strong className="text-[#f8f5ee]">{confirmedBooking.customer.email}</strong>.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <a
                href={getGoogleCalendarUrl()}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 bg-[#1b1915] border border-[#3b3731] hover:border-[#c5a059] text-xs uppercase tracking-wider text-[#f8f5ee] transition-colors flex items-center gap-2"
              >
                <CalendarPlus className="w-4 h-4 text-[#c5a059]" />
                <span>Add to Google Calendar</span>
              </a>

              <button
                type="button"
                onClick={downloadIcsFile}
                className="px-5 py-2.5 bg-[#1b1915] border border-[#3b3731] hover:border-[#c5a059] text-xs uppercase tracking-wider text-[#f8f5ee] transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-[#c5a059]" />
                <span>Download Pass (.ics)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (onCloseModal) {
                    onCloseModal();
                  } else {
                    handleResetBooking();
                  }
                }}
                className="px-6 py-2.5 bg-[#c5a059] hover:bg-[#dec58b] text-[#0c0b09] font-bold text-xs uppercase tracking-[0.2em] transition-colors"
              >
                {isOpenAsModal ? 'Done & Return' : 'Back To Home'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
