import {useEffect, useState} from 'react'
import {useParams, useHistory} from 'react-router-dom'

import {getMovieDetails, getMovieCredits} from '../../api/moviesApi'
import Loader from '../../components/Loader'

import './index.css'

const MovieDetails = () => {
  const {movieId} = useParams()
  const [movie, setMovie] = useState(null)
  const [cast, setCast] = useState([])
  const [error, setError] = useState('')
  const history = useHistory()

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setError('')

      try {
        const data = await getMovieDetails(movieId)
        const castData = await getMovieCredits(movieId)

        setMovie(data)
        setCast(castData)
      } catch (err) {
        setError('Something went wrong. Please try again later.')
      }
    }

    fetchMovieDetails()
  }, [movieId])

  if (movie === null && error === '') {
    return <Loader />
  }

  if (error) {
    return <p className="message">{error}</p>
  }

  return (
    <div className="movie-details">
      <div className="movie-details-card">
        <img
          className="movie-details-poster"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />

        <div className="movie-details-info">
          <h1 className="movie-details-title">{movie.title}</h1>

          <p className="movie-details-rating">⭐ {movie.vote_average}</p>

          <p className="movie-details-overview">{movie.overview}</p>

          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>

          <p>
            <strong>Runtime:</strong> {movie.runtime} minutes
          </p>
          <button
            className="back-button"
            type="button"
            onClick={() => history.goBack()}
          >
            Back to movies
          </button>
        </div>
      </div>
      <div className="cast-section">
        <h2 className="cast-title">Cast</h2>
        <div className="cast-grid">
          {cast.map(actor => (
            <div className="cast-card" key={actor.id}>
              <img
                className="cast-image"
                src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                alt={actor.name}
              />
              <h3 className="cast-name">{actor.name}</h3>
              <p className="cast-character">{actor.character}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MovieDetails
