import React from 'react';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img src={movie.poster} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>{movie.description}</p>
      <p>Genre: {movie.genre}</p>
      <p>Time: {movie.time}</p>
    </div>
  );
};

export default MovieCard;

