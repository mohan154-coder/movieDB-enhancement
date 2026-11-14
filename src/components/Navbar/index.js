import {useState} from 'react'
import {Link, useHistory, useLocation} from 'react-router-dom'

import './index.css'

const Navbar = () => {
  const [searchInput, setSearchInput] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const history = useHistory()
  const location = useLocation()

  const searchMovies = () => {
    if (searchInput.trim() === '') {
      return
    }
    const searchUrl = `/search?query=${searchInput}`
    history.push(searchUrl)
    setSearchInput('')
  }

  const getActiveClass = path =>
    location.pathname === path ? 'nav-button active' : 'nav-button'

  return (
    <nav className="navbar">
      <Link to="/">
        <h1 className="navbar-logo">movieDB</h1>
      </Link>
      <button
        type="button"
        className="menu-button"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? '✕' : '☰'}
      </button>

      <div className={`navbar-links ${isMenuOpen ? 'menu-open' : ''}`}>
        <Link to="/">
          <button
            type="button"
            onClick={() => {
              setIsMenuOpen(false)
            }}
            className={`${getActiveClass('/')} popular-button`}
            aria-label="Popular"
          />
        </Link>
        <Link to="/top-rated">
          <button
            type="button"
            onClick={() => {
              setIsMenuOpen(false)
            }}
            className={getActiveClass('/top-rated')}
          >
            Top Rated
          </button>
        </Link>
        <Link to="/upcoming">
          <button
            type="button"
            onClick={() => {
              setIsMenuOpen(false)
            }}
            className={getActiveClass('/upcoming')}
          >
            Upcoming
          </button>
        </Link>
      </div>

      <div className={`search-container ${isMenuOpen ? 'menu-open' : ''}`}>
        <div className="search-input-container">
          <input
            className="search-input"
            type="text"
            placeholder="Search movies"
            value={searchInput}
            onChange={event => setSearchInput(event.target.value)}
            onKeyDown={event => {
              if (event.key === 'Enter') {
                searchMovies()
              }
            }}
          />
          {searchInput && (
            <button
              type="button"
              className="clear-search-button"
              onClick={() => setSearchInput('')}
            >
              X
            </button>
          )}
        </div>
        <button type="button" onClick={searchMovies} className="search-button">
          Search
        </button>
      </div>
    </nav>
  )
}

export default Navbar
