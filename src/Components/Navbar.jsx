import React from 'react'




const Navbar = () => {
  return (
  <>
  
  <nav className=' mx-auto z-[50] w-[90%] sm:w-[85%] md:w-[80%] lg:w-[75%] xl:w-[70%] mt-4 px-4 sm:px-6 md:px-8 py-2 rounded-xl border shadow-lg  transition-all flex justify-center items-center duration-300 flex-col sm:flex-row '>
    <div className='navbar-logo text-2xl md:text-4xl font-bold'>
       <h1>Movie <span className='text-red-500'>Website</span></h1>
    </div>
   

  </nav>
  </>
  )
}

export default Navbar