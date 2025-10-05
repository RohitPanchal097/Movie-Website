import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [genres, setGenres] = useState([]);
  
  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=41940d354916763b51d7fc769681ea65"
    );
    const data = await response.json();
    setMovies(data.results);
  };

  return (
    <section className="movie-list max-w-7xl mx-auto mt-4 mb-">
      <header className="movie-list-header flex  items-center justify-between mb-4 md:flex-row sm:flex-col flex-col">
        <div className="movie-list-title">
          <h2>Popular Movies</h2>
        </div>
        <div className="movie-list-filter-container flex items-center gap-4">
          <div className="movie-list-filter ">
            <ul className="flex gap-2">
              <li>All </li>
              <li>Action</li>
              <li>Adventure</li>
              <li>Comedy</li>
              <li>Drama</li>
            </ul>
          </div>

          <select className="movie-list-sort ">
            <option className="text-black" value="SortBy">
              SortBy
            </option>
            <option className="text-black" value="Date">
              Date
            </option>
            <option className="text-black" value="Rating">
              Rating
            </option>
          </select>
          <select className="movie-list-sort  ">
            <option className="text-black" value="Ascending">
              Ascending
            </option>
            <option className="text-black" value="Descending">
              Descending
            </option>
          </select>
        </div>
      </header>
      <div className="movie-cards-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) =>(
          <MovieCard key={movie.id} movie={movie} />
        ))}

        {/* <MovieCard /> */} 
      </div>
    </section>
  );
};

export default MovieList;
