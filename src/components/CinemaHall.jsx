import React, { useState } from 'react';

const CinemaHall = () => {
  const totalSeats = 30;
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (seat) => {
    setSelectedSeats(prev =>
      prev.includes(seat) ? prev.filter(s => s !== seat) : [...prev, seat]
    );
  };

  return (
    <div>
      <div className="cinema-hall">
        {Array.from({ length: totalSeats }, (_, i) => i + 1).map((seat) => (
          <div
            key={seat}
            className={`seat ${selectedSeats.includes(seat) ? 'selected' : 'available'}`}
            onClick={() => toggleSeat(seat)}
          >
            {seat}
          </div>
        ))}
      </div>
      <p>Обрані місця: {selectedSeats.join(', ')}</p>
    </div>
  );
};

export default CinemaHall;
 
