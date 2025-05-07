
import React from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../data/moviesData';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link 
      to={`/movie/${movie.id}`}
      className="movie-card flex flex-col h-full animate-fade-in"
    >
      <div className="relative overflow-hidden aspect-[2/3]">
        <img 
          src={movie.posterUrl} 
          alt={`${movie.title} poster`} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-cinema-gold px-2 py-1 text-xs rounded">
          {movie.rating}
        </div>
      </div>
      <div className="p-3 flex-grow flex flex-col">
        <h3 className="movie-title mb-1">{movie.title}</h3>
        <p className="movie-info mb-1">{movie.genre.join(", ")}</p>
        <p className="movie-info mt-auto">{movie.duration}</p>
      </div>
    </Link>
  );
};

export default MovieCard;
