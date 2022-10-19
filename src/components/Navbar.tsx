import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
      <nav className='flex justify-between items-center h-[50px] px-5 shadow-md bg-gray-500 text-white '>
          <h3>Git Search</h3>

          <span>
              <Link to='/' className='mx-2'>Home</Link>
              <Link to='/favs'>Favorites</Link>
          </span>
    </nav>
  )
}

export default Navbar