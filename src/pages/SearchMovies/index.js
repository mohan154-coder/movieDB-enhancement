import {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'

import {getSearchMovies} from '../../api/moviesApi'
import MovieCard from '../../components/MovieCard'
import Loader from '../../components/Loader'

import './index.css'

const SearchMovies = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const searchInput = searchParams.get('query')

  const [isLoading, setIsLoading] = useState(true)
  const [movies, setMovies] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchSearchMovies = async () => {
      setIsLoading(true)
      setError('')

      try {
        if (searchInput) {
          const data = await getSearchMovies(searchInput)
          setMovies(data)
        }
      } catch (err) {
        setError('Failed to search movies. Please try again.')
      }
      setIsLoading(false)
    }

    fetchSearchMovies()
  }, [searchInput])

  let moviesContent
  if (isLoading) {
    moviesContent = <Loader />
  } else if (error) {
    moviesContent = <p>{error}</p>
  } else if (movies.length === 0) {
    moviesContent = <p className="message">No movies found.</p>
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
    <div className="search-movies-container">
      <h1>
        Search Results for <span>{searchInput}</span>
      </h1>
      {moviesContent}
    </div>
  )
}

export default SearchMovies
