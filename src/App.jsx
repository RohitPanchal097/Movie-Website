import Navbar from './Components/Navbar'
import MovieList from './Components/MovieList'
const App = () => {
  return (
    <div className='App min-h-screen text-white bg-black'>
       <Navbar />
    <MovieList />
      </div>
  )
}

export default App