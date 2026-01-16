import React, { useState, useEffect, use } from "react";
import { useParams, useNavigate } from "react-router-dom";
const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const Navigate = useNavigate();
  const [credits, setCredits] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [trailers, setTrailers] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const respone = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=41940d354916763b51d7fc769681ea65`
        );
        if (!respone.ok) {
          throw new Error("Failed to fetch movie details");
        }
        const data = await respone.json();
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [id]);

  useEffect(() => {
    const fetchMovieCredits = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=41940d354916763b51d7fc769681ea65`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movie credits");
        }
        const data = await response.json();
        setCredits(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchMovieCredits();
  }, [id]);

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/similar?api_key=41940d354916763b51d7fc769681ea65`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch similar movies");
        }
        const data = await response.json();
        setSimilarMovies(data.results.slice(0, 5));
      } catch (err) {
        setError(err.message);
      }
    };
    fetchSimilarMovies();
  }, [id]);

  useEffect(() => {
    const fetchTrailers = async () => {
      try{
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=41940d354916763b51d7fc769681ea65`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch trailers");
        }
        const data = await response.json();
        setTrailers(data.results.filter(video => video.type === "Trailer"));
      }
      catch (err) {
        setError(err.message);
    }
    };
    fetchTrailers()
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!movie) {
    return <p>No movie found</p>;
  }

  return (
    <>
      <div className="movie-details-container p-8 bg-black text-white min-h-screen mx-auto z-2">
        <h2 className="text-3xl font-bold mb-4 text-center">{movie.title}</h2>

        <button
          onClick={() => Navigate(-1)}
          className="mb-4 p-2 px-4  bg-gray-500 hover:bg-gray-800 text-white rounded cursor-pointer"
        >
          Back{" "}
        </button>
        <div className="flex flex-col md:flex-row">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            className="w-full md:w-1/3 rounded-lg shadow-lg"
          />
          <div className="md:ml-8 mt-4 md:mt-0 text-lg leading-relaxed">
            <p className="mb-2">
              <strong>Release Date:</strong> {movie.release_date}
            </p>
            <p className="mb-2">
              <strong>Rating:</strong> {movie.vote_average}
            </p>
            <p className="mb-4">
              <strong>Overview:</strong> {movie.overview}
            </p>
            <p className="mb-2">
              <strong>Genres:</strong>{" "}
              {movie.genres.map((genre) => genre.name).join(", ")}
            </p>
            <p className="mb-2">
              <strong>Runtime:</strong> {movie.runtime} minutes
            </p>
            {movie.budget > 0 && (
              <p>
                <strong>Budget:</strong> ${movie.budget.toLocaleString()}
              </p>
            )}
            {movie.revenue > 0 && (
              <p>
                <strong>Revenue:</strong> ${movie.revenue.toLocaleString()}
              </p>
            )}
            <p>
              <strong>Production Companies:</strong>{" "}
              {movie.production_companies
                ?.map((company) => company.name)
                .join(", ")}
            </p>

            {credits && (
              <div>
                <h3 className="text-2xl font-bold mt-6 mb-4">Cast</h3>
                <ul className="list-disc list-inside flex gap-2 items-center justify-center">
                  {credits.cast.slice(0, 5).map((actor) => (
                    <li key={actor.id}>
                      {actor.name} as {actor.character}
                    </li>
                  ))}
                </ul>
                
              </div>
            )}
            {trailers.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold mt-6 mb-4">Trailers</h3>
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${trailers[0]?.key}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
        </div>
        {similarMovies.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold mt-6 mb-4">Similar Movies</h3>
            <div className="flex flex-wrap gap-4 cursor-pointer">
              {similarMovies.map((similarMovie) => (
                <div key={similarMovie.id} onClick={() => Navigate(`/movie/${similarMovie.id}`)} className="mb-4 w-48">
                  <img src={`https://image.tmdb.org/t/p/w500/${similarMovie.poster_path}`} alt={similarMovie.title} />
                  <h4>{similarMovie.title}</h4>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MovieDetails;
