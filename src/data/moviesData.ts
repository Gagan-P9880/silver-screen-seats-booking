
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

export const movies: Movie[] = [
  {
    id: 1,
    title: "Inception",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
    genre: ["Sci-Fi", "Action", "Adventure"],
    duration: "2h 28m",
    rating: "8.8/10",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
    releaseDate: "2010-07-16"
  },
  {
    id: 2,
    title: "The Dark Knight",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
    genre: ["Action", "Crime", "Drama"],
    duration: "2h 32m",
    rating: "9.0/10",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    releaseDate: "2008-07-18"
  },
  {
    id: 3,
    title: "Interstellar",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
    genre: ["Adventure", "Drama", "Sci-Fi"],
    duration: "2h 49m",
    rating: "8.6/10",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    releaseDate: "2014-11-07"
  },
  {
    id: 4,
    title: "Pulp Fiction",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    genre: ["Crime", "Drama"],
    duration: "2h 34m",
    rating: "8.9/10",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    director: "Quentin Tarantino",
    cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
    releaseDate: "1994-10-14"
  },
  {
    id: 5,
    title: "The Matrix",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
    genre: ["Action", "Sci-Fi"],
    duration: "2h 16m",
    rating: "8.7/10",
    description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    director: "Lana Wachowski, Lilly Wachowski",
    cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    releaseDate: "1999-03-31"
  },
  {
    id: 6,
    title: "Avengers: Endgame",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg",
    genre: ["Action", "Adventure", "Drama"],
    duration: "3h 1m",
    rating: "8.4/10",
    description: "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
    director: "Anthony Russo, Joe Russo",
    cast: ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo"],
    releaseDate: "2019-04-26"
  }
];

export const showtimes: Showtime[] = [
  { id: 1, movieId: 1, date: "2025-05-07", time: "10:00 AM", hall: "Hall 1", price: 10.00 },
  { id: 2, movieId: 1, date: "2025-05-07", time: "1:30 PM", hall: "Hall 2", price: 12.00 },
  { id: 3, movieId: 1, date: "2025-05-07", time: "5:00 PM", hall: "Hall 1", price: 14.00 },
  { id: 4, movieId: 1, date: "2025-05-07", time: "8:30 PM", hall: "Hall 3", price: 16.00 },
  
  { id: 5, movieId: 2, date: "2025-05-07", time: "11:00 AM", hall: "Hall 2", price: 10.00 },
  { id: 6, movieId: 2, date: "2025-05-07", time: "2:30 PM", hall: "Hall 1", price: 12.00 },
  { id: 7, movieId: 2, date: "2025-05-07", time: "6:00 PM", hall: "Hall 3", price: 14.00 },
  { id: 8, movieId: 2, date: "2025-05-07", time: "9:30 PM", hall: "Hall 2", price: 16.00 },
  
  { id: 9, movieId: 3, date: "2025-05-07", time: "10:30 AM", hall: "Hall 3", price: 10.00 },
  { id: 10, movieId: 3, date: "2025-05-07", time: "2:00 PM", hall: "Hall 2", price: 12.00 },
  { id: 11, movieId: 3, date: "2025-05-07", time: "5:30 PM", hall: "Hall 1", price: 14.00 },
  { id: 12, movieId: 3, date: "2025-05-07", time: "9:00 PM", hall: "Hall 3", price: 16.00 },

  { id: 13, movieId: 4, date: "2025-05-07", time: "11:30 AM", hall: "Hall 1", price: 10.00 },
  { id: 14, movieId: 4, date: "2025-05-07", time: "3:00 PM", hall: "Hall 3", price: 12.00 },
  { id: 15, movieId: 4, date: "2025-05-07", time: "6:30 PM", hall: "Hall 2", price: 14.00 },
  { id: 16, movieId: 4, date: "2025-05-07", time: "10:00 PM", hall: "Hall 1", price: 16.00 },

  { id: 17, movieId: 5, date: "2025-05-07", time: "10:15 AM", hall: "Hall 2", price: 10.00 },
  { id: 18, movieId: 5, date: "2025-05-07", time: "1:45 PM", hall: "Hall 3", price: 12.00 },
  { id: 19, movieId: 5, date: "2025-05-07", time: "5:15 PM", hall: "Hall 2", price: 14.00 },
  { id: 20, movieId: 5, date: "2025-05-07", time: "8:45 PM", hall: "Hall 1", price: 16.00 },

  { id: 21, movieId: 6, date: "2025-05-07", time: "11:15 AM", hall: "Hall 3", price: 10.00 },
  { id: 22, movieId: 6, date: "2025-05-07", time: "2:45 PM", hall: "Hall 1", price: 12.00 },
  { id: 23, movieId: 6, date: "2025-05-07", time: "6:15 PM", hall: "Hall 3", price: 14.00 },
  { id: 24, movieId: 6, date: "2025-05-07", time: "9:45 PM", hall: "Hall 2", price: 16.00 }
];

export const generateSeats = (): Seat[] => {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const seatsPerRow = 12;
  const seats: Seat[] = [];
  
  for (const row of rows) {
    for (let i = 1; i <= seatsPerRow; i++) {
      // Generate some random occupied seats
      const randomStatus = Math.random() < 0.2 ? 'occupied' : 'available';
      
      seats.push({
        id: `${row}${i}`,
        row: row,
        number: i,
        status: randomStatus
      });
    }
  }
  
  return seats;
};
