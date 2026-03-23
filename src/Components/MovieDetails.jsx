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
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'cast', label: 'Cast' },
    { id: 'trailers', label: 'Trailers' }
  ];

  const handleTabKeyDown = (event) => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
    if (event.key === 'ArrowRight') {
      const nextIndex = (currentIndex + 1) % tabs.length;
      setActiveTab(tabs[nextIndex].id);
    }
    if (event.key === 'ArrowLeft') {
      const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      setActiveTab(tabs[prevIndex].id);
    }
  };

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
    return <div aria-live="polite">Loading movie details...</div>;
  }
  if (error) {
    return <div role="alert" aria-live="assertive">Error: {error}</div>;
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
          aria-label="Go back to previous page"
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

            <div role="tablist" aria-label="Movie detail sections" className="flex gap-2 mt-6 mb-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  role="tab"
                  id={`${tab.id}-tab`}
                  aria-controls={`${tab.id}-panel`}
                  aria-selected={activeTab === tab.id}
                  className={`px-3 py-2 rounded ${activeTab === tab.id ? 'bg-gray-700 text-white' : 'bg-gray-800 text-gray-300'}`}
                  onClick={() => setActiveTab(tab.id)}
                  onKeyDown={handleTabKeyDown}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === 'overview' && (
              <section id="overview-panel" role="tabpanel" aria-labelledby="overview-tab" className="mb-4">
                <h3 className="text-2xl font-bold mb-2">Overview</h3>
                <p>{movie.overview}</p>
              </section>
            )}

            {activeTab === 'cast' && (
              <section id="cast-panel" role="tabpanel" aria-labelledby="cast-tab" className="mb-4">
                <h3 className="text-2xl font-bold mb-2">Cast</h3>
                <ul className="list-disc list-inside space-y-1">
                  {credits?.cast.slice(0, 8).map((actor) => (
                    <li key={actor.id}>{actor.name} as {actor.character}</li>
                  ))}
                </ul>
              </section>
            )}

            {activeTab === 'trailers' && (
              <section id="trailers-panel" role="tabpanel" aria-labelledby="trailers-tab" className="mb-4">
                <h3 className="text-2xl font-bold mb-2">Trailers</h3>
                {trailers.length > 0 ? (
                  <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${trailers[0]?.key}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <p>No trailers available</p>
                )}
              </section>
            )}
          </div>
        </div>
        {similarMovies.length > 0 && (
          <section aria-labelledby="similar-movies-heading">
            <h3 id="similar-movies-heading" className="text-2xl font-bold mt-6 mb-4">Similar Movies</h3>
            <div className="flex flex-wrap gap-4">
              {similarMovies.map((similarMovie) => (
                <button key={similarMovie.id} onClick={() => Navigate(`/movie/${similarMovie.id}`)} className="mb-4 w-48" aria-label={`View details for ${similarMovie.title}`}>
                  <img src={`https://image.tmdb.org/t/p/w500/${similarMovie.poster_path}`} alt={`Poster for ${similarMovie.title}`} />
                  <h4>{similarMovie.title}</h4>
                </button>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default MovieDetails;
