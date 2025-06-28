import React from 'react'
import { Outlet } from 'react-router-dom'

const AlbumLandingConent = () => {
  return (
    <div className='basis-[80%] min-h-[calc(100vh-70px)]'>
        <Outlet/>
    </div>
  )
}

export default AlbumLandingConent