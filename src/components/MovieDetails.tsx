
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Movie, Showtime } from '../types/cinema';
import { fetchShowtimesByMovieId } from '../services/movieService';
import { useToast } from "../hooks/use-toast";

interface MovieDetailsProps {
  movie: Movie;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie }) => {
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [selectedShowtime, setSelectedShowtime] = useState<Showtime | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    const loadShowtimes = async () => {
      try {
        setIsLoading(true);
        const data = await fetchShowtimesByMovieId(movie.id);
        setShowtimes(data);
      } catch (error) {
        console.error("Failed to load showtimes:", error);
        toast({
          title: "Error",
          description: "Failed to load showtimes. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadShowtimes();
  }, [movie.id, toast]);
  
  const handleShowtimeSelect = (showtime: Showtime) => {
    setSelectedShowtime(showtime);
  };
  
  const handleContinue = () => {
    if (selectedShowtime) {
      navigate(`/seats/${selectedShowtime.id}`);
    }
  };

  // Group showtimes by date
  const showtimesByDate = showtimes.reduce((acc, showtime) => {
    if (!acc[showtime.date]) {
      acc[showtime.date] = [];
    }
    acc[showtime.date].push(showtime);
    return acc;
  }, {} as Record<string, Showtime[]>);

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/3">
          <div className="rounded-lg overflow-hidden">
            <img 
              src={movie.posterUrl} 
              alt={`${movie.title} poster`} 
              className="w-full object-cover"
            />
          </div>
        </div>
        
        <div className="lg:w-2/3">
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {movie.genre.map((genre, index) => (
              <span key={index} className="bg-cinema-dark-gray px-3 py-1 rounded-full text-xs">
                {genre}
              </span>
            ))}
          </div>
          
          <div className="flex gap-4 text-sm text-cinema-light-gray mb-4">
            <span>{movie.duration}</span>
            <span>•</span>
            <span>{movie.rating}</span>
            <span>•</span>
            <span>Released: {new Date(movie.releaseDate).toLocaleDateString()}</span>
          </div>
          
          <p className="mb-4 text-cinema-light-gray">{movie.description}</p>
          
          <div className="mb-3">
            <span className="text-cinema-light-gray">Director: </span>
            <span>{movie.director}</span>
          </div>
          
          <div className="mb-6">
            <span className="text-cinema-light-gray">Cast: </span>
            <span>{movie.cast.join(", ")}</span>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Showtimes</h3>
            
            {isLoading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cinema-gold"></div>
              </div>
            ) : Object.keys(showtimesByDate).length > 0 ? (
              Object.keys(showtimesByDate).map((date) => (
                <div key={date} className="mb-6">
                  <h4 className="text-lg font-medium mb-3">
                    {new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {showtimesByDate[date].map((showtime) => (
                      <button
                        key={showtime.id}
                        className={`time-slot ${selectedShowtime?.id === showtime.id ? 'selected' : ''}`}
                        onClick={() => handleShowtimeSelect(showtime)}
                      >
                        <div>{showtime.time}</div>
                        <div className="text-xs mt-1">{showtime.hall}</div>
                      </button>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-cinema-light-gray">No showtimes available at the moment.</p>
            )}
            
            <button
              className="cinema-btn cinema-btn-primary w-full mt-4 py-3"
              disabled={!selectedShowtime}
              onClick={handleContinue}
            >
              {selectedShowtime 
                ? `Continue - $${selectedShowtime.price.toFixed(2)}` 
                : 'Select a showtime'
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
