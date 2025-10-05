import React from 'react'
import Navbar from './Navbar'
import MovieList from './MovieList'

const Home = () => {
  return (
    <div className='App min-h-screen text-white bg-black overflow-hidden'>
        <Navbar />
        <main className='max-w-7xl lg:px-8 sm:px-6 mx-auto'>
            <MovieList />
            
        </main>
       
    </div>
  )
}

export default Home