import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const handleClick = () =>{
    navigate(`/movie/${movie.id}`)
  }

  return (
    <button 
      onClick={handleClick} 
      className="group relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 h-96 w-full"
      aria-label={`View details for ${movie.title}`}
    >
      {/* Poster Image */}
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={`Poster for ${movie.title}`}
        className="w-full h-full object-cover group-hover:brightness-75 transition"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h3 className="text-lg font-bold mb-2">{movie.title}</h3>
        
        <div className="flex justify-between items-center mb-2 text-sm">
          <span className="text-gray-300">{movie.release_date?.split('-')[0]}</span>
          <span className="text-yellow-400 font-bold">⭐ {movie.vote_average?.toFixed(1)}</span>
        </div>

        <p className="text-gray-200 text-sm line-clamp-3">
          {movie.overview}
        </p>

        <div className="mt-3 flex items-center justify-center gap-2 text-white">
          <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
            ▶
          </div>
          <span className="font-semibold">View Details</span>
        </div>
      </div>
    </button>
  );
};

export default MovieCard;
