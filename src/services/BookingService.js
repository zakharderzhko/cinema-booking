const BookingService = {
    getBookings(movieId) {
      const data = localStorage.getItem(`bookings_${movieId}`);
      return data ? JSON.parse(data) : [];
    },
  
    getBookedSeats(movieId) {
      const bookings = BookingService.getBookings(movieId);
      return bookings.map(b => b.seat);
    },
  
    saveBooking(movieId, seats, user) {
      const currentBookings = BookingService.getBookings(movieId);
      const newBookings = seats.map(seat => ({
        seat,
        name: user.name,
        phone: user.phone,
        email: user.email,
      }));
      const updatedBookings = [...currentBookings, ...newBookings];
      localStorage.setItem(`bookings_${movieId}`, JSON.stringify(updatedBookings));
    },
  
    isSeatBooked(movieId, seat) {
      return BookingService.getBookedSeats(movieId).includes(seat);
    }
  };
  
  export default BookingService;
  