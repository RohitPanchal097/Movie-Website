import React, { useState, useEffect, use } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
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
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      
      {/* Back Button */}
      <div className="fixed top-20 left-4 z-50">
        <button
          onClick={() => Navigate(-1)}
          className="bg-white/10 hover:bg-white/20 text-white rounded-full w-10 h-10 flex items-center justify-center transition"
          aria-label="Go back to previous page"
        >
          ←
        </button>
      </div>

      {/* Hero Section */}
      <div
        className="relative w-full h-screen bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 100%), url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`,
        }}
      >
        <div className="absolute inset-0 flex items-end pb-12">
          <div className="max-w-7xl mx-auto w-full px-4 md:px-8 flex flex-col md:flex-row gap-8 items-end">
            {/* Poster */}
            <div className="hidden md:block flex-shrink-0">
              <img
                src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
                alt={movie.title}
                className="w-64 rounded-lg shadow-2xl"
              />
            </div>

            {/* Title and Info */}
            <div className="flex-grow">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">{movie.title}</h1>
              <p className="text-lg text-gray-300 mb-6 max-w-2xl">{movie.overview}</p>

              {/* Meta Info Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/10 backdrop-blur p-3 rounded">
                  <p className="text-gray-400 text-sm">Rating</p>
                  <p className="text-2xl font-bold">{movie.vote_average?.toFixed(1)}</p>
                </div>
                <div className="bg-white/10 backdrop-blur p-3 rounded">
                  <p className="text-gray-400 text-sm">Runtime</p>
                  <p className="text-2xl font-bold">{movie.runtime} min</p>
                </div>
                <div className="bg-white/10 backdrop-blur p-3 rounded">
                  <p className="text-gray-400 text-sm">Release Date</p>
                  <p className="text-lg font-bold">{movie.release_date?.split('-')[0]}</p>
                </div>
                {movie.budget > 0 && (
                  <div className="bg-white/10 backdrop-blur p-3 rounded">
                    <p className="text-gray-400 text-sm">Budget</p>
                    <p className="text-lg font-bold">${(movie.budget / 1000000).toFixed(0)}M</p>
                  </div>
                )}
                {movie.revenue > 0 && (
                  <div className="bg-white/10 backdrop-blur p-3 rounded">
                    <p className="text-gray-400 text-sm">Revenue</p>
                    <p className="text-lg font-bold">${(movie.revenue / 1000000).toFixed(0)}M</p>
                  </div>
                )}
                {movie.genres.length > 0 && (
                  <div className="bg-white/10 backdrop-blur p-3 rounded">
                    <p className="text-gray-400 text-sm">Genres</p>
                    <p className="text-sm font-bold">{movie.genres.map(g => g.name).join(', ')}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        
        {/* Cast Section */}
        {credits?.cast && credits.cast.length > 0 && (
          <section className="mb-16" aria-labelledby="cast-heading">
            <h2 id="cast-heading" className="text-4xl font-bold mb-8">Cast</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {credits.cast.slice(0, 12).map((actor) => (
                <div key={actor.id} className="bg-gray-900/50 rounded-lg overflow-hidden hover:bg-gray-800 transition">
                  <div className="aspect-square bg-gray-800 overflow-hidden">
                    {actor.profile_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                        alt={actor.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-500">No Image</div>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="font-semibold text-sm">{actor.name}</p>
                    <p className="text-xs text-gray-400">{actor.character}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Trailers Section */}
        {trailers.length > 0 && (
          <section className="mb-16" aria-labelledby="trailers-heading">
            <h2 id="trailers-heading" className="text-4xl font-bold mb-8">Trailers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trailers.slice(0, 6).map((trailer) => (
                <div
                  key={trailer.id}
                  className="relative group bg-gray-900 rounded-lg overflow-hidden aspect-video cursor-pointer"
                >
                  <img
                    src={`https://img.youtube.com/vi/${trailer.key}/maxresdefault.jpg`}
                    alt={trailer.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                  <a
                    href={`https://www.youtube.com/watch?v=${trailer.key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition"
                    aria-label={`Watch ${trailer.name}`}
                  >
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                      ▶
                    </div>
                  </a>
                  <p className="absolute bottom-0 left-0 right-0 bg-black/80 p-2 text-sm font-semibold">{trailer.name}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* You Might Also Like Section */}
        {similarMovies.length > 0 && (
          <section aria-labelledby="similar-movies-heading">
            <h2 id="similar-movies-heading" className="text-4xl font-bold mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {similarMovies.map((similarMovie) => (
                <button
                  key={similarMovie.id}
                  onClick={() => Navigate(`/movie/${similarMovie.id}`)}
                  className="group cursor-pointer"
                  aria-label={`View details for ${similarMovie.title}`}
                >
                  <div className="relative rounded-lg overflow-hidden bg-gray-900 aspect-[2/3] mb-2">
                    {similarMovie.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w342/${similarMovie.poster_path}`}
                        alt={`Poster for ${similarMovie.title}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-500">No Image</div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                        ▶
                      </div>
                    </div>
                  </div>
                  <h4 className="font-semibold text-sm line-clamp-2 group-hover:text-gray-300 transition">{similarMovie.title}</h4>
                </button>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
