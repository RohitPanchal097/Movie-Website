import React from "react";

const MovieList = () => {
  return (
    <section className="movie-list max-w-5/6 mx-auto">
      <header className="movie-list-header flex  items-center justify-between">
        <div className="movie-list-title">
        <h2>Popular Movies</h2>
        </div>
        <div className="movie-list-filter-container flex items-center gap-4">
        <div className="movie-list-filter ">
          <ul className="flex gap-2">
            <li>All</li>
            <li>Action</li>
            <li>Adventure</li>
            <li>Comedy</li>
            <li>Drama</li>
          </ul>
        </div>
        
        <select className="movie-list-sort ">
          <option className="text-black" value="SortBy">SortBy</option>
          <option className="text-black" value="Date">Date</option>
          <option className="text-black" value="Rating">Rating</option>
        </select>
        <select className="movie-list-sort  ">
            <option className="text-black" value="Ascending">Ascending</option>
            <option className="text-black" value="Descending">Descending</option>
        </select>
        </div>
      </header>
      <div className="movie-list-content"></div>
    </section>
  );
};

export default MovieList;
