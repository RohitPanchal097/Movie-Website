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
  {/* className='mx-auto z-[50] w-[90%] sm:w-[85%] md:w-[80%] lg:w-[75%] xl:w-[70%] mt-4 px-4 sm:px-6 md:px-8 py-2 rounded-xl border shadow-lg transition-all flex flex-col sm:flex-row justify-between items-center duration-300' */}
  <nav className=' mx-auto z-[50] w-[90%] sm:w-[85%] md:w-[80%] lg:w-[75%] xl:w-[70%] mt-4 px-4 sm:px-6 md:px-8 py-2 rounded-xl border shadow-lg  transition-all flex justify-between items-center duration-300 flex-col sm:flex-row '>
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