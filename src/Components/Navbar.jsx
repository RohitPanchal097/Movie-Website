import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='bg-black/80 backdrop-blur border-b border-gray-800 sticky top-0 z-50' aria-label="Main navigation">
      <div className='max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center'>
        
        {/* Logo */}
        <Link to="/" className='text-2xl font-bold hover:text-gray-300 transition'>
          Movie <span className='text-red-500'>Website</span>
        </Link>

        {/* Navigation Links */}
        <div className='flex items-center gap-6'>
          <Link to="/" className='text-gray-300 hover:text-white transition text-sm font-medium'>
            Home
          </Link>
          <button className='text-gray-300 hover:text-white transition text-sm font-medium'>
            Movies
          </button>
          <button className='text-gray-300 hover:text-white transition text-sm font-medium'>
            Genres
          </button>
          <button className='text-gray-300 hover:text-white transition text-sm font-medium'>
            My List
          </button>
          <button className='bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition font-medium text-sm'>
            Sign In
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar