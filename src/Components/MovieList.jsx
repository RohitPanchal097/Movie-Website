import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [genres, setGenres] = useState([]);
  
  useEffect(() => {
    fetchMovies();
    fetchGenres();
    filterdMovies();
  }, [movies, selectedGenre]);

  const fetchMovies = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=41940d354916763b51d7fc769681ea65"
    );
    const data = await response.json();
    setMovies(data.results);
  };

  const fetchGenres = async () => {
    const response = await fetch( "https://api.themoviedb.org/3/genre/movie/list?api_key=41940d354916763b51d7fc769681ea65" );
    const data = await response.json()
    setGenres(data.genres)
  }

  const filterdMovies = () => {
    if(selectedGenre === "All"){
      setFilteredMovies(movies)
    } else {
     const genreId = genres.find(genre => genre.name === selectedGenre)?.id;
     const filtered = movies.filter(movie => movie.genre_ids.includes(genreId))
     setFilteredMovies(filtered)
    }
  }

const handleGenreFilter = (genre) =>{
  setSelectedGenre(genre)
}

  return (
    <section className="movie-list max-w-7xl mx-auto mt-4 mb-">
      <header className="movie-list-header flex  items-center justify-between mb-5 md:flex-row sm:flex-col flex-col">
        <div className="movie-list-title">
          <h2>Popular Movies</h2>
        </div>
        <div className="movie-list-filter-container flex items-center gap-4 md:flex-row sm:flex-col flex-col">
          <div className="movie-list-filter ">
            <ul className="flex gap-2">
              <li
              onClick={() => handleGenreFilter("All")}  
              className={`cursor-pointer ${selectedGenre === "All" ? "text-red-500" : "text-white"}`}  
              >All </li>
              <li
              onClick={() => handleGenreFilter("Action")}
              className={`cursor-pointer ${selectedGenre === "Action" ? "text-red-500" : "text-white"}`}
              >Action</li>
              <li
              onClick={() => handleGenreFilter("Adventure")}
              className={`cursor-pointer ${selectedGenre === "Adventure" ? "text-red-500" : "text-white"}`}
              >Adventure</li>
              <li
              onClick={() => handleGenreFilter("Comedy")}
              className={`cursor-pointer ${selectedGenre === "Comedy" ? "text-red-500" : "text-white"}`}
              >Comedy</li>
              <li
              onClick={() => handleGenreFilter("Drama")}
              className={`cursor-pointer ${selectedGenre === "Drama" ? "text-red-500" : "text-white"}`}
              >Drama</li>
             
            </ul>
          </div>
        {/* Sort by */}
        <div className="movie-list-sort-container flex items-center gap-4 ">
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
         
        </div>
      </header>
      <div className="movie-cards-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center">
        {filteredMovies.map((movie) =>(
          <MovieCard key={movie.id} movie={movie} />
        ))}

        {/* <MovieCard /> */} 
      </div>
    </section>
  );
};

export default MovieList;
