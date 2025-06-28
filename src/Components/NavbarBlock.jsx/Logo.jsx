import React from 'react'
import ListenerMusicLogo from "../../assets/Listenerlogo.png"

const Logo = () => {
  return (
   <aside className="basis[15%]">
     <figure className="w-full h-full">
        <img src={ListenerMusicLogo} alt="" className="w-[150px] h-[70px]"/>
     </figure>

   </aside>
  )
}

export default Logo