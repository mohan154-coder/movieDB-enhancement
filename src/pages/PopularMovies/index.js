import {useEffect, useState} from 'react'
import getPopularMovies from '../../api/moviesApi'
import MovieCard from '../../components/MovieCard'
import Loader from '../../components/Loader'

import './index.css'

const PopularMovies = () => {
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true)
      setError('')
      try {
        const data = await getPopularMovies(page)
        setMovies(data)
      } catch (err) {
        setError('Something went wrong. Please try again later.')
      }
      setIsLoading(false)
    }
    fetchMovies()
  }, [page])

  let moviesContent
  if (isLoading) {
    moviesContent = <Loader />
  } else if (error) {
    moviesContent = <p className="message">{error}</p>
  } else {
    moviesContent = (
      <div className="movies-grid">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    )
  }

  return (
    <div className="popular-movies">
      <h1 className="popular-movies-title">Popular Movies</h1>
      {moviesContent}
      <div className="pagination">
        <button
          type="button"
          onClick={() => setPage(page > 1 ? page - 1 : 1)}
          disabled={page === 1}
        >
          Previous
        </button>

        <p>Page {page}</p>

        <button type="button" onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  )
}

export default PopularMovies
