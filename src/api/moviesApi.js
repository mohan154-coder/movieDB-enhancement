const API_KEY = process.env.REACT_APP_TMDB_API_KEY

const BASE_URL = 'https://api.themoviedb.org/3'

const getPopularMovies = async page => {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`,
  )

  if (!response.ok) {
    throw new Error('API request failed')
  }
  const data = await response.json()
  return data.results
}

const getTopRatedMovies = async page => {
  const response = await fetch(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}`,
  )

  if (!response.ok) {
    throw new Error('API request failed')
  }
  const data = await response.json()

  return data.results
}

const getUpcomingMovies = async page => {
  const response = await fetch(
    `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&page=${page}`,
  )

  if (!response.ok) {
    throw new Error('API request failed')
  }
  const data = await response.json()
  return data.results
}

const getMovieDetails = async movieId => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`,
  )

  if (!response.ok) {
    throw new Error('API request failed')
  }
  const data = await response.json()
  return data
}

const getMovieCredits = async movieId => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`,
  )

  if (!response.ok) {
    throw new Error('API request failed')
  }

  const data = await response.json()
  return data.cast
}

const getSearchMovies = async searchInput => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchInput}`,
  )

  if (!response.ok) {
    throw new Error('API request failed')
  }
  const data = await response.json()
  return data.results
}

export {getTopRatedMovies}
export {getUpcomingMovies}
export {getMovieDetails}
export {getMovieCredits}
export {getSearchMovies}

export default getPopularMovies
