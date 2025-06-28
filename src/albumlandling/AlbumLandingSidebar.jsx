import React from 'react'
import { BiSolidAlbum } from 'react-icons/bi'
import { GiHamburgerMenu } from 'react-icons/gi'
import { NavLink } from 'react-router-dom'

const AlbumLandingSidebar = () => {
  return (
    <aside className="basis-[20%] bg-gradient-to-b from-gray-300 to-gray-700 h-min-[calc(100vh-70px)]">
      <nav className='w-full px-5 py-3'>
        <ul className='w-full flex flex-col'>
          <li className=' mb-3 py-2 px-6 bg-blue-600 rounded flex items-center gap-3'>
            <span className='text-xl'><GiHamburgerMenu/></span>
            <span className='text-lg tracking-wider'>Explore</span>
          </li>
          <li><NavLink to ={"/"}end className={({isActive})=>`${isActive?"bg-blue-600 hover:bg-blue-700":""} py-2 px-6 hover:bg-blue-600 rounded cursor-pointer flex items-center gap-3`}>
            < BiSolidAlbum className='text-xl'/>
            <span className='text-lg tracking-wider'>Popular albums</span>
            </NavLink></li>
        </ul>
      </nav>
    </aside>
  )
}

export default AlbumLandingSidebar