
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Film } from 'lucide-react';
import { Movie, Showtime } from '../types/cinema';
import { fetchMovieById, fetchShowtimeById } from '../services/movieService';
import SeatSelection from '../components/SeatSelection';
import { useToast } from "../hooks/use-toast";

const SeatsPage = () => {
  const { showtimeId } = useParams<{ showtimeId: string }>();
  const [showtime, setShowtime] = useState<Showtime | null>(null);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    const loadData = async () => {
      if (!showtimeId) {
        navigate('/');
        return;
      }
      
      try {
        setIsLoading(true);
        const showtimeData = await fetchShowtimeById(parseInt(showtimeId));
        setShowtime(showtimeData);
        
        const movieData = await fetchMovieById(showtimeData.movieId);
        setMovie(movieData);
      } catch (error) {
        console.error("Failed to load data:", error);
        toast({
          title: "Error",
          description: "Failed to load seat selection. Please try again.",
          variant: "destructive"
        });
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [showtimeId, navigate, toast]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-cinema-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cinema-gold"></div>
      </div>
    );
  }
  
  if (!showtime || !movie) {
    return null;
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
