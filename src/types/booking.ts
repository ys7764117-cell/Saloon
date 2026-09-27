export interface Service {
  id: string;
  name: string;
  category: 'haircut' | 'beard' | 'combo' | 'spa' | 'package';
  price: number;
  duration: number; // in minutes
  description: string;
  image: string;
  features?: string[];
  popular?: boolean;
}

export interface Barber {
  id: string;
  name: string;
  position: string;
  experience: string;
  specialty: string;
  bio: string;
  avatar: string;
  instagram: string;
  rating: number;
  reviewsCount: number;
}

export interface TimeSlot {
  time: string;
  period: 'morning' | 'afternoon' | 'evening';
  available: boolean;
}

export interface CustomerInfo {
  fullName: string;
  phone: string;
  email: string;
  notes?: string;
  agreedToTerms: boolean;
}

export interface BookingState {
  serviceId: string;
  barberId: string; // 'any' or specific barber id
  date: string; // ISO date string YYYY-MM-DD
  time: string;
  customer: CustomerInfo;
}

export interface ConfirmedBooking {
  bookingId: string;
  service: Service;
  barber: Barber | { id: string; name: string; position: string; avatar: string };
  date: string;
  time: string;
  customer: CustomerInfo;
  createdAt: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Haircuts' | 'Fades' | 'Beard' | 'Styling' | 'Grooming' | 'Salon';
  imageUrl: string;
  barberName: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  serviceUsed: string;
}
