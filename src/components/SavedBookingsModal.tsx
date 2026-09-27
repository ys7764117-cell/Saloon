import React from 'react';
import { X, Calendar, Clock, Scissors, Trash2, Download, CheckCircle2 } from 'lucide-react';
import { ConfirmedBooking } from '../types/booking';

interface SavedBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: ConfirmedBooking[];
  onCancelBooking: (bookingId: string) => void;
  onBookNew: () => void;
}

export const SavedBookingsModal: React.FC<SavedBookingsModalProps> = ({
  isOpen,
  onClose,
  bookings,
  onCancelBooking,
  onBookNew,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
      <div className="relative max-w-2xl w-full bg-[#12110e] border border-[#3b3731] shadow-2xl max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-[#24221e] flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#c5a059] font-['Cinzel'] font-bold">
              Patron Dashboard
            </div>
            <h3 className="font-['Cinzel'] text-xl font-bold uppercase text-[#f8f5ee]">
              Your Reserved Appointments
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#8e877a] hover:text-[#f8f5ee] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {bookings.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <Calendar className="w-12 h-12 text-[#3b3731] mx-auto" />
              <div className="font-['Cinzel'] text-base text-[#ded8cb]">
                No Active Appointments Found
              </div>
              <p className="text-xs text-[#8e877a] max-w-xs mx-auto">
                You currently have no scheduled appointments at The Gentlemen’s Cut.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onBookNew();
                }}
                className="px-6 py-2.5 bg-[#c5a059] hover:bg-[#dec58b] text-[#0c0b09] font-bold text-xs uppercase tracking-wider transition-colors inline-block"
              >
                Schedule Appointment
              </button>
            </div>
          ) : (
            bookings.map((b) => (
              <div
                key={b.bookingId}
                className="bg-[#181714] border border-[#2e2b25] p-5 shadow-lg relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#c5a059]">
                      {b.bookingId}
                    </span>
                    <span className="px-2 py-0.5 text-[9px] uppercase tracking-wider bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 rounded">
                      {b.status}
                    </span>
                  </div>

                  <h4 className="font-['Cinzel'] text-sm sm:text-base font-bold text-[#f8f5ee] uppercase">
                    {b.service.name}
                  </h4>

                  <div className="text-xs text-[#ded8cb]">
                    Craftsman: <span className="text-[#f8f5ee] font-medium">{b.barber.name}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#8e877a] pt-1">
                    <span className="flex items-center gap-1 font-mono text-[#ded8cb]">
                      <Calendar className="w-3.5 h-3.5 text-[#c5a059]" />
                      <span>{b.date}</span>
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1 font-mono text-[#dec58b]">
                      <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
                      <span>{b.time}</span>
                    </span>
                    <span>·</span>
                    <span className="text-[#c5a059] font-bold font-['Cinzel']">
                      ₹{b.service.price}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => onCancelBooking(b.bookingId)}
                    className="p-2 text-[#8e877a] hover:text-red-400 hover:bg-red-950/20 border border-transparent hover:border-red-900/50 rounded transition-colors"
                    title="Cancel reservation"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {bookings.length > 0 && (
          <div className="p-4 border-t border-[#24221e] bg-[#100f0c] flex items-center justify-between">
            <span className="text-[11px] text-[#8e877a]">
              Please arrive 5 minutes before your scheduled slot.
            </span>
            <button
              onClick={() => {
                onClose();
                onBookNew();
              }}
              className="px-4 py-2 bg-[#c5a059] hover:bg-[#dec58b] text-[#0c0b09] text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Book Another
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
