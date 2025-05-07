
import { supabase } from "@/integrations/supabase/client";
import { Movie, Showtime, Seat } from "../types/cinema";

export const fetchMovies = async (): Promise<Movie[]> => {
  const { data, error } = await supabase
    .from('movies')
    .select('*');
  
  if (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }

  return data.map(movie => ({
    id: movie.id,
    title: movie.title,
    posterUrl: movie.poster_url,
    genre: movie.genre,
    duration: movie.duration,
    rating: movie.rating,
    description: movie.description,
    director: movie.director,
    cast: movie.cast_members,
    releaseDate: movie.release_date
  }));
};

export const fetchMovieById = async (id: number): Promise<Movie> => {
  const { data, error } = await supabase
    .from('movies')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error("Error fetching movie:", error);
    throw error;
  }

  return {
    id: data.id,
    title: data.title,
    posterUrl: data.poster_url,
    genre: data.genre,
    duration: data.duration,
    rating: data.rating,
    description: data.description,
    director: data.director,
    cast: data.cast_members,
    releaseDate: data.release_date
  };
};

export const fetchShowtimesByMovieId = async (movieId: number): Promise<Showtime[]> => {
  const { data, error } = await supabase
    .from('showtimes')
    .select('*')
    .eq('movie_id', movieId);
  
  if (error) {
    console.error("Error fetching showtimes:", error);
    throw error;
  }

  return data.map(showtime => ({
    id: showtime.id,
    movieId: showtime.movie_id,
    date: showtime.date,
    time: showtime.time,
    hall: showtime.hall,
    price: showtime.price
  }));
};

export const fetchShowtimeById = async (showtimeId: number): Promise<Showtime> => {
  const { data, error } = await supabase
    .from('showtimes')
    .select('*')
    .eq('id', showtimeId)
    .single();
  
  if (error) {
    console.error("Error fetching showtime:", error);
    throw error;
  }

  return {
    id: data.id,
    movieId: data.movie_id,
    date: data.date,
    time: data.time,
    hall: data.hall,
    price: data.price
  };
};

export const fetchSeatsByHall = async (hall: string): Promise<Seat[]> => {
  const { data, error } = await supabase
    .from('seats')
    .select('*')
    .eq('hall', hall);
  
  if (error) {
    console.error("Error fetching seats:", error);
    throw error;
  }

  return data.map(seat => ({
    id: seat.id,
    row: seat.row,
    number: seat.number,
    status: 'available' // Default status, will be updated later
  }));
};

export const fetchBookedSeats = async (showtimeId: number): Promise<string[]> => {
  const { data, error } = await supabase
    .from('booked_seats')
    .select('seat_id')
    .eq('showtime_id', showtimeId);
  
  if (error) {
    console.error("Error fetching booked seats:", error);
    throw error;
  }

  return data.map(item => item.seat_id);
};

export const createBooking = async (
  userId: string,
  showtimeId: number,
  seatIds: string[],
  totalAmount: number
): Promise<string> => {
  // Generate a booking reference
  const bookingReference = `BK${Math.floor(100000 + Math.random() * 900000)}`;
  
  // Insert booking
  const { data: bookingData, error: bookingError } = await supabase
    .from('bookings')
    .insert({
      user_id: userId,
      showtime_id: showtimeId,
      total_amount: totalAmount,
      booking_reference: bookingReference
    })
    .select()
    .single();
  
  if (bookingError) {
    console.error("Error creating booking:", bookingError);
    throw bookingError;
  }

  // Insert booked seats
  const bookedSeatsData = seatIds.map(seatId => ({
    booking_id: bookingData.id,
    seat_id: seatId,
    showtime_id: showtimeId
  }));

  const { error: seatsError } = await supabase
    .from('booked_seats')
    .insert(bookedSeatsData);
  
  if (seatsError) {
    console.error("Error booking seats:", seatsError);
    throw seatsError;
  }

  return bookingReference;
};
