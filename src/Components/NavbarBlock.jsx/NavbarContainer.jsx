import React from 'react'
import Menu from './Menu'
import Logo from './logo'



const NavbarContainer = () => {
  return (
    <header className='w-[100vw] h-[70px] bg-gradient-to-r from-gray-300 to-gray-700 text-white flex justify-between items-center '>
        <Logo/>
        <Menu/>
    </header>
  )
}

export default NavbarContainer