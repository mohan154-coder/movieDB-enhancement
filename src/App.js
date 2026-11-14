import {Route, Switch} from 'react-router-dom'
import Navbar from './components/Navbar'

import PopularMovies from './pages/PopularMovies'
import TopRated from './pages/TopRated'
import Upcoming from './pages/Upcoming'
import SearchMovies from './pages/SearchMovies'
import MovieDetails from './pages/MovieDetails'

import './App.css'

const App = () => (
  <>
    <Navbar />
    <Switch>
      <Route exact path="/" component={PopularMovies} />
      <Route exact path="/top-rated" component={TopRated} />
      <Route exact path="/upcoming" component={Upcoming} />
      <Route exact path="/search" component={SearchMovies} />
      <Route path="/movie/:movieId" component={MovieDetails} />
    </Switch>
  </>
)

export default App
