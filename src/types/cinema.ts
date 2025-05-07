
export interface Movie {
  id: number;
  title: string;
  posterUrl: string;
  genre: string[];
  duration: string;
  rating: string;
  description: string;
  director: string;
  cast: string[];
  releaseDate: string;
}

export interface Showtime {
  id: number;
  movieId: number;
  date: string;
  time: string;
  hall: string;
  price: number;
}

export interface Seat {
  id: string;
  row: string;
  number: number;
  status: 'available' | 'selected' | 'occupied';
}

export interface BookingDetails {
  movie: Movie;
  showtime: Showtime;
  selectedSeats: Seat[];
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  totalAmount: number;
  bookingId: string;
  bookingDate: string;
}

export interface Profile {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
}
