import React, { useState } from 'react';
import MovieList from './components/MovieList';
import movies from './data/movies';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <input
        type="text"
        placeholder="Search Movies"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <MovieList movies={filteredMovies} />
    </div>
  );
};

export default App;

