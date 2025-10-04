import React from 'react'

const navItems = [
    {
        name: "Popular",
        path: "/popular"
    },
    {
        name: "Top Rated",
        path: "/top-rated"
    },
    {
        name: "Upcoming",
        path: "/upcoming"
    },
]


const Navbar = () => {
  return (
  <>
  <nav className='navbar flex justify-between items-center py-4 px-10 mb-4 max-w-5/6 mx-auto border-b border-gray-700'>
    <div className='navbar-logo text-2xl md:text-4xl font-bold'>
       <h1>Movie <span className='text-red-500'>Website</span></h1>
    </div>
    <div className='navbar-items flex gap-4 text-xl md:text-2xl '>
        {navItems.map((items,key) => (
            <a href={items.path} key={key}>{items.name}</a>
        ))}
    </div>

  </nav>
  </>
  )
}

export default Navbar