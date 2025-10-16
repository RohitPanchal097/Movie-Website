import React, { useEffect, useState } from "react";
import _ from "lodash";
import MovieCard from "./MovieCard";
const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [genres, setGenres] = useState([]);
  const [sort, setSort] = useState({
    by: "default",
    order: "asc"
  })
  
  useEffect(() => {
    fetchMovies();
    fetchGenres();
  }, []);

  useEffect(() => {
    filterMovies();
  }, [movies, selectedGenre]);

  useEffect(() => {
    if (sort.by !== "default") {
      let moviesToSort = [...filteredMovies];
      
      // Handle date sorting by converting to Date objects
      if (sort.by === "release_date") {
        moviesToSort = moviesToSort.map(movie => ({
          ...movie,
          release_date_parsed: new Date(movie.release_date)
        }));
        const sortedMovies = _.orderBy(moviesToSort, ['release_date_parsed'], [sort.order]);
        // Remove the temporary parsed date property
        const cleanedMovies = sortedMovies.map(({release_date_parsed, ...movie}) => movie);
        setFilteredMovies(cleanedMovies);
      } else {
        const sortedMovies = _.orderBy(moviesToSort, [sort.by], [sort.order]);
        setFilteredMovies(sortedMovies);
      }
    } else {
      // Reset to original filtered movies when "default" is selected
      filterMovies();
    }
  }, [sort]);

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

  const filterMovies = () => {
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

const handleSort = (e) =>{
  const {name, value} = e.target;
  setSort(prev =>{
    return {...prev, [name]: value}
   
  })
  
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
        <select name='by'className="movie-list-sort " onChange={handleSort} value={sort.by}>
            <option value="default" className="text-black" >
              SortBy
            </option>
            <option value= "release_date" className="text-black" >
              Date
            </option>
            <option value="vote_average" className="text-black" >
              Rating
            </option>
          </select>
          <select name= 'order' className="movie-list-sort  " onChange={handleSort} value={sort.order}>
            <option value="asc" className="text-black" >
              Ascending
            </option>
            <option value='desc'className="text-black" >
              Descending
            </option>
          </select>
        </div>
         
        </div>
      </header>
      <div className="movie-cards-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center  ">
        {filteredMovies.map((movie) =>(
          <MovieCard key={movie.id} movie={movie} />
        ))}

        {/* <MovieCard /> */} 
      </div>
    </section>
  );
};

export default MovieList;
