import {Link} from 'react-router-dom'

import './index.css'

const MovieCard = props => {
  const {movie} = props
  return (
    <div className="movie-card">
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : 'https://via.placeholder.com/300x450?text=No+Image'
        }
        className="movie-poster"
        alt={movie.title}
      />
      <h3 className="movie-title">{movie.title}</h3>
      <p className="movie-rating">⭐ {movie.vote_average}</p>
      <Link to={`/movie/${movie.id}`}>
        <button type="button" className="details-button">
          View Details
        </button>
      </Link>
    </div>
  )
}

export default MovieCard
