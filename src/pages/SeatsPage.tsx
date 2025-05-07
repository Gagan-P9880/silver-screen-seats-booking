
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Film } from 'lucide-react';
import { movies, showtimes } from '../data/moviesData';
import SeatSelection from '../components/SeatSelection';

const SeatsPage = () => {
  const { showtimeId } = useParams<{ showtimeId: string }>();
  const [showtime, setShowtime] = useState<any>(null);
  const [movie, setMovie] = useState<any>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (showtimeId) {
      const foundShowtime = showtimes.find(s => s.id === parseInt(showtimeId));
      if (foundShowtime) {
        setShowtime(foundShowtime);
        
        const foundMovie = movies.find(m => m.id === foundShowtime.movieId);
        if (foundMovie) {
          setMovie(foundMovie);
        } else {
          navigate('/');
        }
      } else {
        navigate('/');
      }
    }
  }, [showtimeId, navigate]);
  
  if (!showtime || !movie) {
    return (
      <div className="min-h-screen bg-cinema-dark flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cinema-dark pb-20">
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
          <Link to={`/movie/${movie.id}`} className="flex items-center text-cinema-light-gray hover:text-cinema-gold transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            Back to Movie
          </Link>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Select Your Seats</h2>
          <SeatSelection showtime={showtime} movie={movie} />
        </div>
      </main>
    </div>
  );
};

export default SeatsPage;
