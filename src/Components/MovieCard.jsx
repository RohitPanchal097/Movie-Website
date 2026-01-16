import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const handleClick = () =>{
    navigate(`/movie/${movie.id}`)
  }

  return (
        <div onClick={handleClick} className="movie-card hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg rounded-xl overflow-hidden w-65 h-96 relative">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt=""
          />
          <div className="movie-card-content absolute bottom-0 left-0 right-0 p-4 bg-black/80 ">
          
            <h3 className="text-lg font-bold">{movie.title}</h3>
            <div className="movie-card-rating flex justify-between items-center mb-2">
              <p>{movie.release_date}</p>
              <p className="text-yellow-500">{movie.vote_average.toFixed(1)}</p>
            </div>
            <p className="movie-card-description">
              {movie.overview.slice(0, 100) + "..."}
            </p>
          </div>
        </div>
      
    
  );
};

export default MovieCard;
