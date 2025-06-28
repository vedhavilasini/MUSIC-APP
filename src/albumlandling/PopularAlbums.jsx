import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { __DB } from '../backend/firebaseconfig'
import { FaMusic } from 'react-icons/fa6'
import { NavLink } from 'react-router-dom'
import Spinner from '../helper/Spinner'

const PopularAlbums = () => {
    let[albums,setAlbums]=useState(null)
    useEffect(() => {
        let fetchAlbums = async() => {
            // ! now we will fetch the albums from the database
            let albumCollectionRef = collection(__DB, "music-app");
            let getAlbums= await getDocs(albumCollectionRef);
            console.log(getAlbums)

            // ! now we will extract the required data
            let albumData=getAlbums.docs.map((album)=>({
                ...album?.data(),
                songs:album?.data()?.songs||[]

            }))
            console.log("album data",albumData)
            setAlbums(albumData);
        }
        fetchAlbums();
    }, []);
    return (
       <section className='w-[80vw]  '>
        {albums?(<article className='w-full '>
            <header className='w-full p-5 flex items-center gap-3'>
                <span className='text-3xl'><FaMusic/></span>
                <h1 className='text-3xl font-bold'>Popular Albums</h1>
            </header>
            <main className='w-full '>
                <div className='px-6 flex gap-5 items-center'>
                    {albums.map((album ,index)=>{
                        return<NavLink to={`album-details/${album?.albumTitle}`}key={index}state={album}>
                            <div className='w-[220px] h-[300px] bg-black/50 p-4 rounded-lg hover:bg-black hover:ring-1 hover:ring-[wheat] '>
                                <img src={album?.albumThumbnail} alt={album?.albumTitle} className='w-full h-[230px] object-cover rounded-md hover:scale-105 transition-all duration-100 easw-linear'/>
                                <h1 className='py-2 p-3 bg-black text-white rounded text-md font-semibold mt-2'>{album?.albumTitle}</h1>
                            </div></NavLink>
                    })}
                </div>
            </main>
        </article>):(<section className='inset-0 w-full h-full bg-black/50 fixed top-0'>
        <Spinner/>
      </section>)}
        
       </section>
    )
}

export default PopularAlbums