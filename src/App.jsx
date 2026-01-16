import Home from './Components/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MovieDetails from './Components/MovieDetails'
const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/movie/:id',
      element: <MovieDetails />
    }
  ]
)
const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App