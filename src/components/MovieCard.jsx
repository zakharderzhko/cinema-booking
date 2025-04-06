import React from 'react';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const handleBooking = () => {
    navigate(`/booking/${movie.title}`);
  };
  return (
    <div className="movie-card">
      <img src={movie.poster} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>{movie.description}</p>
      <p>Genre: {movie.genre}</p>
      <p>Time: {movie.time}</p>
      <button onClick={handleBooking}>Забронювати</button>
    </div>
  );
};

export default MovieCard;

