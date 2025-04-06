import React from 'react';
import { useParams } from 'react-router-dom';
import CinemaHall from '../components/CinemaHall';

const Booking = () => {
  const { id } = useParams();

  return (
    <div className="app">
      <h2>Бронювання: {id}</h2>
      <CinemaHall />
    </div>
  );
};

export default Booking;
 
