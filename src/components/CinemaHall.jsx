import React, { useState, useEffect } from 'react';
import BookingService from '../services/BookingService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CinemaHall = ({ movieId }) => {
  const totalSeats = 30;

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [showForm, setShowForm] = useState(false); // для показу форми

  useEffect(() => {
    // Після завантаження отримуємо заброньовані місця для фільму
    const booked = BookingService.getBookedSeats(movieId);
    setBookedSeats(booked);
  }, [movieId]);

  const toggleSeat = (seat) => {
    if (bookedSeats.includes(seat)) return; // не дозволяємо вибирати заброньовані місця
    setSelectedSeats(prev =>
      prev.includes(seat) ? prev.filter(s => s !== seat) : [...prev, seat]
    );
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { name, phone, email } = form;
    if (!name || !phone || !email) {
      toast.error('Усі поля обовʼязкові для заповнення!');
      return false;
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      toast.error('Некоректний формат email!');
      return false;
    }
    return true;
  };

  const handleBooking = () => {
    if (!validateForm()) return;

    BookingService.saveBooking(movieId, selectedSeats, form);
    toast.success('Бронювання успішне!');
    setBookedSeats([...bookedSeats, ...selectedSeats]); // оновлюємо візуал
    setSelectedSeats([]); // очищаємо вибране
    setForm({ name: '', phone: '', email: '' }); // очищаємо форму
    setShowForm(false); // приховуємо форму після бронювання
  };

  const handleBookClick = () => {
    setShowForm(true); // показуємо форму після натискання на кнопку
  };

  return (
    <div>
      <div className="cinema-hall">
        {Array.from({ length: totalSeats }, (_, i) => i + 1).map((seat) => (
          <div
            key={seat}
            className={`seat 
              ${bookedSeats.includes(seat) ? 'booked' : 
                selectedSeats.includes(seat) ? 'selected' : 'available'}`}
            onClick={() => toggleSeat(seat)}
          >
            {seat}
          </div>
        ))}
      </div>

      <p>Обрані місця: {selectedSeats.join(', ')}</p>

      {!showForm ? (
        <button onClick={handleBookClick} className="book-button">
          Забронювати
        </button>
      ) : (
        <div className="booking-form">
          <input
            type="text"
            name="name"
            placeholder="Імʼя"
            value={form.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Телефон"
            value={form.phone}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleInputChange}
          />
          <button onClick={handleBooking}>Забронювати</button>
        </div>
      )}
    </div>
  );
};

export default CinemaHall;
