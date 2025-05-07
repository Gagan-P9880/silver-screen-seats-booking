
import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Film } from 'lucide-react';
import Checkout from '../components/Checkout';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { movie, showtime, selectedSeats } = location.state || {};

  useEffect(() => {
    // Redirect to home if no booking data is available
    if (!movie || !showtime || !selectedSeats) {
      navigate('/');
    }
  }, [movie, showtime, selectedSeats, navigate]);

  if (!movie || !showtime || !selectedSeats) {
    return null;
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
          <Link to={`/seats/${showtime.id}`} className="flex items-center text-cinema-light-gray hover:text-cinema-gold transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            Back to Seat Selection
          </Link>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <Checkout 
            movie={movie} 
            showtime={showtime} 
            selectedSeats={selectedSeats} 
          />
        </div>
      </main>

      <footer className="bg-cinema-dark-gray border-t border-cinema-dark mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="text-sm text-center text-cinema-light-gray">
            <p>&copy; {new Date().getFullYear()} SilverScreen. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CheckoutPage;
