import React from 'react'
import Navbar from './Navbar'
import MovieList from './MovieList'

const Home = () => {
  return (
    <div className='min-h-screen text-white bg-black'>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded">Skip to main content</a>
      <Navbar />
      <main id="main-content" className='max-w-7xl mx-auto px-4 md:px-8 py-12' aria-label="Popular movies">
        <MovieList />
      </main>
    </div>
  )
}

export default Home