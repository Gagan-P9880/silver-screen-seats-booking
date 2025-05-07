
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Movie, Showtime, Seat } from '../types/cinema';
import { createBooking } from '../services/movieService';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "../hooks/use-toast";

interface CheckoutProps {
  movie: Movie;
  showtime: Showtime;
  selectedSeats: Seat[];
}

const Checkout: React.FC<CheckoutProps> = ({ movie, showtime, selectedSeats }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  
  const totalPrice = selectedSeats.length * showtime.price;
  const serviceFee = selectedSeats.length * 1.5;
  const grandTotal = totalPrice + serviceFee;
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      // Check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        // For demo purposes, we'll create an anonymous booking
        // In a real app, we would redirect to login/signup
        
        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const bookingDetails = {
          movie,
          showtime,
          selectedSeats,
          customer: formData,
          totalAmount: grandTotal,
          bookingId: `BK${Math.floor(100000 + Math.random() * 900000)}`,
          bookingDate: new Date().toISOString(),
        };
        
        navigate('/confirmation', { state: { bookingDetails } });
      } else {
        // Create a real booking in the database
        const seatIds = selectedSeats.map(seat => seat.id);
        
        // Save booking to database
        const bookingReference = await createBooking(
          user.id,
          showtime.id,
          seatIds,
          grandTotal
        );
        
        const bookingDetails = {
          movie,
          showtime,
          selectedSeats,
          customer: formData,
          totalAmount: grandTotal,
          bookingId: bookingReference,
          bookingDate: new Date().toISOString(),
        };
        
        navigate('/confirmation', { state: { bookingDetails } });
      }
    } catch (error) {
      console.error("Error processing booking:", error);
      toast({
        title: "Payment Failed",
        description: "There was an issue processing your payment. Please try again.",
        variant: "destructive"
      });
      setIsProcessing(false);
    }
  };
  
  const isFormValid = Object.values(formData).every(value => value.trim() !== '');

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-6">Complete Your Purchase</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="bg-cinema-dark-gray rounded-lg p-4 mb-6">
            <h3 className="font-semibold mb-3 text-lg">Order Summary</h3>
            
            <div className="flex mb-4">
              <div className="w-20 h-28 overflow-hidden rounded">
                <img 
                  src={movie.posterUrl} 
                  alt={movie.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-4">
                <h4 className="font-semibold">{movie.title}</h4>
                <p className="text-cinema-light-gray text-sm mb-1">{showtime.hall}</p>
                <p className="text-cinema-light-gray text-sm mb-1">
                  {new Date(showtime.date).toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric' 
                  })} • {showtime.time}
                </p>
                <div className="mt-2">
                  <p className="text-sm">
                    <span className="text-cinema-light-gray">Seats: </span>
                    {selectedSeats.map(seat => `${seat.row}${seat.number}`).join(', ')}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-cinema-light-gray border-opacity-20 pt-3">
              <div className="flex justify-between mb-2">
                <span className="text-cinema-light-gray">Tickets ({selectedSeats.length})</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-cinema-light-gray">Service Fee</span>
                <span>${serviceFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold mt-3 pt-3 border-t border-cinema-light-gray border-opacity-20">
                <span>Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <form onSubmit={handleSubmit}>
            <h3 className="font-semibold mb-4 text-lg">Contact Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="firstName" className="block text-sm text-cinema-light-gray mb-1">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full bg-cinema-dark-gray border border-cinema-light-gray border-opacity-30 rounded p-2 focus:border-cinema-gold focus:outline-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm text-cinema-light-gray mb-1">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full bg-cinema-dark-gray border border-cinema-light-gray border-opacity-30 rounded p-2 focus:border-cinema-gold focus:outline-none"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="email" className="block text-sm text-cinema-light-gray mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-cinema-dark-gray border border-cinema-light-gray border-opacity-30 rounded p-2 focus:border-cinema-gold focus:outline-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm text-cinema-light-gray mb-1">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-cinema-dark-gray border border-cinema-light-gray border-opacity-30 rounded p-2 focus:border-cinema-gold focus:outline-none"
                  required
                />
              </div>
            </div>
            
            <h3 className="font-semibold mb-4 text-lg pt-2">Payment Information</h3>
            
            <div className="mb-4">
              <label htmlFor="cardNumber" className="block text-sm text-cinema-light-gray mb-1">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                className="w-full bg-cinema-dark-gray border border-cinema-light-gray border-opacity-30 rounded p-2 focus:border-cinema-gold focus:outline-none"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="expiry" className="block text-sm text-cinema-light-gray mb-1">Expiry Date</label>
                <input
                  type="text"
                  id="expiry"
                  name="expiry"
                  value={formData.expiry}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  className="w-full bg-cinema-dark-gray border border-cinema-light-gray border-opacity-30 rounded p-2 focus:border-cinema-gold focus:outline-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="cvv" className="block text-sm text-cinema-light-gray mb-1">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  className="w-full bg-cinema-dark-gray border border-cinema-light-gray border-opacity-30 rounded p-2 focus:border-cinema-gold focus:outline-none"
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              className={`cinema-btn cinema-btn-primary w-full py-3 ${isProcessing ? 'opacity-70' : ''}`}
              disabled={!isFormValid || isProcessing}
            >
              {isProcessing ? 'Processing...' : `Complete Payment - $${grandTotal.toFixed(2)}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
