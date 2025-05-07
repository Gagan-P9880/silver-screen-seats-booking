
import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Film, Check, Ticket } from 'lucide-react';

const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingDetails } = location.state || {};

  useEffect(() => {
    // Redirect to home if no booking data is available
    if (!bookingDetails) {
      navigate('/');
    }
  }, [bookingDetails, navigate]);

  if (!bookingDetails) {
    return null;
  }

  const { movie, showtime, selectedSeats, customer, totalAmount, bookingId, bookingDate } = bookingDetails;

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
        <div className="max-w-2xl mx-auto text-center mb-10">
          <div className="w-20 h-20 bg-cinema-dark-gray rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="text-cinema-gold" size={40} />
          </div>
          <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-cinema-light-gray">
            Your tickets have been booked successfully.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto bg-cinema-dark-gray rounded-lg overflow-hidden border border-cinema-light-gray border-opacity-20 animate-scale-in">
          <div className="p-6 border-b border-cinema-light-gray border-opacity-20">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <Ticket className="text-cinema-gold mr-2" />
                <h2 className="text-xl font-semibold">Booking Details</h2>
              </div>
              <span className="text-cinema-light-gray text-sm">Booking ID: {bookingId}</span>
            </div>
            <p className="text-cinema-light-gray text-sm">
              {new Date(bookingDate).toLocaleString()}
            </p>
          </div>
          
          <div className="p-6 border-b border-cinema-light-gray border-opacity-20">
            <div className="flex">
              <div className="w-24 h-36 overflow-hidden rounded">
                <img 
                  src={movie.posterUrl} 
                  alt={movie.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-lg">{movie.title}</h3>
                <p className="text-sm text-cinema-light-gray mb-1">{showtime.hall}</p>
                <p className="text-sm text-cinema-light-gray mb-3">
                  {new Date(showtime.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric' 
                  })} • {showtime.time}
                </p>
                <p className="text-sm">
                  <span className="text-cinema-light-gray">Seats: </span>
                  {selectedSeats.map(seat => `${seat.row}${seat.number}`).join(', ')}
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-6 border-b border-cinema-light-gray border-opacity-20">
            <h3 className="font-semibold mb-2">Customer Information</h3>
            <p className="text-sm mb-1">{customer.firstName} {customer.lastName}</p>
            <p className="text-sm mb-1">{customer.email}</p>
            <p className="text-sm">{customer.phone}</p>
          </div>
          
          <div className="p-6">
            <div className="flex justify-between font-bold">
              <span>Total Amount</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto mt-8 text-center">
          <p className="text-cinema-light-gray mb-6">
            Your booking confirmation has been sent to your email.
            You can show this ticket at the cinema entrance.
          </p>
          <Link to="/" className="cinema-btn cinema-btn-primary px-8">
            Return to Movies
          </Link>
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

export default ConfirmationPage;
