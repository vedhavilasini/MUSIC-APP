import React from 'react'
import { NavLink } from 'react-router-dom'
import { BiSolidAlbum } from "react-icons/bi";

const AdminSidebar = () => {
  return (
    <aside className='w-[15%] min-h-[calc(100vh-70px)] flex bg-gradient-to-b from-gray-300 to-gray-700'>
        <nav className=''>
            <ul className='p-6'>
                <li>
                    <NavLink to={"create-album"} className={({isActive})=>`px-4 py-2 flex items-center gap-2 hover:bg-blue-600 rounded-md ${isActive?"bg-blue-600":""}`}>
                        <span className='text-lg'><BiSolidAlbum />
                        </span>
                        <span className='font-semibold'>create album</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    </aside>
  )
}

export default AdminSidebar