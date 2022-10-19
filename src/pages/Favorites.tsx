import React from 'react'
import { useAppSelector } from '../hooks/redux'

function Favorites() {
  const { favorites } = useAppSelector(state => state.github)
  
  
  if (favorites.length === 0) return <p className='text-center'>No Favorite Items</p>


  return (
    <div className='flex justify-center pt-10 mx-auto h-screen w-screen'>
      <ul className='list-none'>
            {favorites.map(f => (
              <li className='hover:bg-gray-300' key={f}>
                <a href={f}>{f}</a>
              </li>
            ))}
          </ul>
    </div>
   
  )
}

export default Favorites