
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Showtime, Movie, Seat } from '../types/cinema';
import { fetchSeatsByHall, fetchBookedSeats } from '../services/movieService';
import { useToast } from "../hooks/use-toast";

interface SeatSelectionProps {
  showtime: Showtime;
  movie: Movie;
}

const SeatSelection: React.FC<SeatSelectionProps> = ({ showtime, movie }) => {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    const loadSeats = async () => {
      try {
        setIsLoading(true);
        // Get all seats for this hall
        const hallSeats = await fetchSeatsByHall(showtime.hall);
        
        // Get booked seats for this showtime
        const bookedSeatIds = await fetchBookedSeats(showtime.id);
        
        // Mark booked seats as occupied
        const updatedSeats = hallSeats.map(seat => ({
          ...seat,
          status: bookedSeatIds.includes(seat.id) ? 'occupied' as const : 'available' as const
        }));
        
        setSeats(updatedSeats);
      } catch (error) {
        console.error("Failed to load seats:", error);
        toast({
          title: "Error",
          description: "Failed to load seat information. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadSeats();
  }, [showtime.id, showtime.hall, toast]);
  
  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'occupied') return;
    
    const isSelected = selectedSeats.some(s => s.id === seat.id);
    
    if (isSelected) {
      setSelectedSeats(selectedSeats.filter(s => s.id !== seat.id));
      
      // Update seat status in the seats array
      setSeats(seats.map(s => 
        s.id === seat.id ? { ...s, status: 'available' as const } : s
      ));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
      
      // Update seat status in the seats array
      setSeats(seats.map(s => 
        s.id === seat.id ? { ...s, status: 'selected' as const } : s
      ));
    }
  };
  
  const handleContinue = () => {
    if (selectedSeats.length > 0) {
      navigate('/checkout', { 
        state: { 
          movie, 
          showtime, 
          selectedSeats 
        } 
      });
    }
  };
  
  // Group seats by row
  const seatsByRow = seats.reduce((acc, seat) => {
    if (!acc[seat.row]) {
      acc[seat.row] = [];
    }
    acc[seat.row].push(seat);
    return acc;
  }, {} as Record<string, Seat[]>);
  
  const totalPrice = selectedSeats.length * showtime.price;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cinema-gold"></div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold mb-1">{movie.title}</h2>
        <p className="text-cinema-light-gray">
          {showtime.date} • {showtime.time} • {showtime.hall}
        </p>
      </div>
      
      <div className="mb-12 w-full bg-gradient-to-b from-cinema-dark to-transparent py-3">
        <div className="w-3/4 h-1 mx-auto rounded bg-cinema-light-gray opacity-30 mb-2"></div>
        <p className="text-center text-sm text-cinema-light-gray">SCREEN</p>
      </div>
      
      <div className="mb-8 flex flex-col items-center">
        {Object.keys(seatsByRow).sort().map(row => (
          <div key={row} className="flex mb-2 items-center">
            <div className="w-8 text-center font-medium text-sm text-cinema-light-gray">
              {row}
            </div>
            <div className="flex flex-wrap justify-center">
              {seatsByRow[row]
                .sort((a, b) => a.number - b.number)
                .map(seat => (
                <div
                  key={seat.id}
                  className={`cinema-seat ${
                    seat.status === 'available' 
                      ? 'seat-available' 
                      : seat.status === 'selected' 
                      ? 'seat-selected' 
                      : 'seat-occupied'
                  }`}
                  onClick={() => handleSeatClick(seat)}
                >
                  {seat.number}
                </div>
              ))}
            </div>
            <div className="w-8"></div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center mb-8">
        <div className="flex items-center mr-6">
          <div className="cinema-seat seat-available w-6 h-6 mr-2"></div>
          <span className="text-sm">Available</span>
        </div>
        <div className="flex items-center mr-6">
          <div className="cinema-seat seat-selected w-6 h-6 mr-2"></div>
          <span className="text-sm">Selected</span>
        </div>
        <div className="flex items-center">
          <div className="cinema-seat seat-occupied w-6 h-6 mr-2"></div>
          <span className="text-sm">Occupied</span>
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 bg-cinema-dark-gray py-4 px-6 border-t border-cinema-light-gray border-opacity-20">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <p className="text-cinema-light-gray mb-1">
              {selectedSeats.length} {selectedSeats.length === 1 ? 'seat' : 'seats'} selected
            </p>
            <p className="text-lg font-bold">
              Total: ${totalPrice.toFixed(2)}
            </p>
          </div>
          <button
            className="cinema-btn cinema-btn-primary"
            disabled={selectedSeats.length === 0}
            onClick={handleContinue}
          >
            Continue to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
