
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Film } from 'lucide-react';
import { Movie, movies, showtimes } from '../data/moviesData';
import MovieDetails from '../components/MovieDetails';

const MoviePage = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [movieShowtimes, setMovieShowtimes] = useState<any[]>([]);
  
  useEffect(() => {
    if (id) {
      const foundMovie = movies.find(m => m.id === parseInt(id));
      if (foundMovie) {
        setMovie(foundMovie);
        
        const filteredShowtimes = showtimes.filter(s => s.movieId === parseInt(id));
        setMovieShowtimes(filteredShowtimes);
      }
    }
  }, [id]);
  
  if (!movie) {
    return (
      <div className="min-h-screen bg-cinema-dark flex items-center justify-center">
        <p>Loading movie details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cinema-dark">
      <header className="border-b border-cinema-dark-gray">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center">
              <Film className="text-cinema-red mr-2" />
              <span className="text-xl font-bold">Silver<span className="text-cinema-gold">Screen</span></span>
            </Link>
            <nav className="hidden md:block">
              <ul className="flex space-x-6">
                <li><Link to="/" className="hover:text-cinema-gold transition-colors">Movies</Link></li>
                <li><a href="#" className="text-cinema-light-gray hover:text-cinema-gold transition-colors">Cinemas</a></li>
                <li><a href="#" className="text-cinema-light-gray hover:text-cinema-gold transition-colors">Deals</a></li>
              </ul>
            </nav>
            <div>
              <button className="cinema-btn cinema-btn-secondary">Sign In</button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/" className="flex items-center text-cinema-light-gray hover:text-cinema-gold transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            Back to Movies
          </Link>
        </div>
        
        <MovieDetails movie={movie} showtimes={movieShowtimes} />
      </main>

      <footer className="bg-cinema-dark-gray border-t border-cinema-dark">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Silver<span className="text-cinema-gold">Screen</span></h4>
              <p className="text-sm text-cinema-light-gray mb-4">
                Your premier destination for the best movie experiences. Comfortable seating, crystal-clear screens, and the latest blockbusters.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-cinema-light-gray hover:text-white transition-colors">Movies</a></li>
                <li><a href="#" className="text-cinema-light-gray hover:text-white transition-colors">Cinemas</a></li>
                <li><a href="#" className="text-cinema-light-gray hover:text-white transition-colors">Offers & Promotions</a></li>
                <li><a href="#" className="text-cinema-light-gray hover:text-white transition-colors">About Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <address className="not-italic text-sm text-cinema-light-gray space-y-2">
                <p>123 Cinema Street</p>
                <p>Movie Town, MT 12345</p>
                <p>Phone: (123) 456-7890</p>
                <p>Email: info@silverscreen.com</p>
              </address>
            </div>
          </div>
          <div className="border-t border-cinema-dark mt-8 pt-6 text-sm text-center text-cinema-light-gray">
            <p>&copy; {new Date().getFullYear()} SilverScreen. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MoviePage;
