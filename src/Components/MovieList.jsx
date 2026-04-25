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
      
     
      if (sort.by === "release_date") {
        moviesToSort = moviesToSort.map(movie => ({
          ...movie,
          release_date_parsed: new Date(movie.release_date)
        }));
        const sortedMovies = _.orderBy(moviesToSort, ['release_date_parsed'], [sort.order]);
        
        const cleanedMovies = sortedMovies.map(({release_date_parsed, ...movie}) => movie);
        setFilteredMovies(cleanedMovies);
      } else {
        const sortedMovies = _.orderBy(moviesToSort, [sort.by], [sort.order]);
        setFilteredMovies(sortedMovies);
      }
    } else {

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
    <section className="movie-list">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-6">Popular Movies</h1>
        
        {/* Filters and Sort */}
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          {/* Genre Filter */}
          <div className="movie-list-filter">
            <label htmlFor="genre-filter" className="text-sm text-gray-400 block mb-2">Genres</label>
            <ul className="flex gap-2 flex-wrap" role="list">
              {["All", "Action", "Adventure", "Comedy", "Drama"].map((genre) => (
                <li key={genre} role="listitem">
                  <button
                    onClick={() => handleGenreFilter(genre)}
                    className={`px-4 py-2 rounded transition ${
                      selectedGenre === genre
                        ? "bg-red-600 text-white"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                    aria-pressed={selectedGenre === genre}
                  >
                    {genre}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Sort Section */}
          <div className="movie-list-sort-container flex gap-4 flex-wrap">
            <div>
              <label htmlFor="sort-by" className="text-sm text-gray-400 block mb-2">Sort By</label>
              <select
                id="sort-by"
                name="by"
                onChange={handleSort}
                value={sort.by}
                className="bg-gray-800 text-white px-3 py-2 rounded border border-gray-700 hover:border-gray-500 transition"
              >
                <option value="default">Default</option>
                <option value="release_date">Release Date</option>
                <option value="vote_average">Rating</option>
              </select>
            </div>

            <div>
              <label htmlFor="sort-order" className="text-sm text-gray-400 block mb-2">Order</label>
              <select
                id="sort-order"
                name="order"
                onChange={handleSort}
                value={sort.order}
                className="bg-gray-800 text-white px-3 py-2 rounded border border-gray-700 hover:border-gray-500 transition"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Movie Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default MovieList;
