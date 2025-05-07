
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Film } from 'lucide-react';
import { movies } from '../data/moviesData';
import MovieCard from '../components/MovieCard';

const Index = () => {
  const [filter, setFilter] = useState<string>('all');

  const filteredMovies = filter === 'all' 
    ? movies 
    : movies.filter(movie => movie.genre.includes(filter));

  const uniqueGenres = [...new Set(movies.flatMap(movie => movie.genre))];

  return (
    <div className="min-h-screen bg-cinema-dark">
      <header className="border-b border-cinema-dark-gray">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center">
              <Film className="text-cinema-red mr-2" />
              <span className="text-xl font-bold">Silver<span className="text-cinema-gold">Screen</span></span>
            </Link>
            <nav>
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
        <section className="mb-12 rounded-xl overflow-hidden relative">
          <div className="relative h-[30vh] md:h-[50vh] w-full">
            <div className="absolute inset-0 bg-gradient-to-r from-cinema-dark to-transparent z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-cinema-dark to-transparent z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba" 
              alt="Cinema" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 p-6 md:p-12 z-20 w-full md:w-2/3">
              <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">
                Experience Movies Like Never Before
              </h1>
              <p className="text-cinema-light-gray mb-4 md:mb-6 md:text-lg">
                Book your tickets now and enjoy the latest blockbusters in premium comfort
              </p>
              <button className="cinema-btn cinema-btn-primary">
                Book Now
              </button>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Now Showing</h2>
            <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
              <button 
                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors ${filter === 'all' ? 'bg-cinema-red text-white' : 'bg-cinema-dark-gray text-white'}`}
                onClick={() => setFilter('all')}
              >
                All Movies
              </button>
              {uniqueGenres.map(genre => (
                <button 
                  key={genre}
                  className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors ${filter === genre ? 'bg-cinema-red text-white' : 'bg-cinema-dark-gray text-white'}`}
                  onClick={() => setFilter(genre)}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {filteredMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Cinema Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-cinema-dark-gray rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-cinema-red rounded-full flex items-center justify-center mx-auto mb-4">
                <Film className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Premium Screens</h3>
              <p className="text-cinema-light-gray">Experience movies in state-of-the-art theaters with premium picture quality</p>
            </div>
            <div className="bg-cinema-dark-gray rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-cinema-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Film className="text-cinema-dark" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Luxury Seating</h3>
              <p className="text-cinema-light-gray">Enjoy the show in our comfortable reclining seats with plenty of legroom</p>
            </div>
            <div className="bg-cinema-dark-gray rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-cinema-red rounded-full flex items-center justify-center mx-auto mb-4">
                <Film className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Gourmet Concessions</h3>
              <p className="text-cinema-light-gray">Indulge in premium snacks and beverages as you watch your favorite movies</p>
            </div>
          </div>
        </section>
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

export default Index;
