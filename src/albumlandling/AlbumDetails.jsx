import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { GlobalAudioPlayer } from '../Context/AudioPlayerContext';

const AlbumDetails = () => {
    let location = useLocation();
    console.log(location)

    let { songs, setSongs, isPlaying, setIsPlaying, currentSongIndex, setCurrentSongIndex } = useContext(GlobalAudioPlayer);
    // ! extract  the album details only from the state
    let albumData = location?.state
    console.log("albumdata", albumData)

    let songList = albumData?.songs;
    console.log("songlist", songList)
    // ! create one function which will handle songs
    let handleSongChange = (index) => {
        setSongs(songList);
        setCurrentSongIndex(index);
        if (currentSongIndex === index){
            setIsPlaying(!isPlaying)
        }else{
            setIsPlaying(true);
        }
    }

    return (
        <section className='w-full min-h-[calc(100vh-70px)] flex flex-col items-center pt-10'>
            <article className='w-[95%] flex  gap-2 h-[400px] bg-gray-500 px-8 py-5 rounded-md hover:bg-gray-800 hover:ring-blue-600 tranisition-all duration-50 ease-linear'>
                <aside className='basis-[30%] h-[350px] p-1 relative'>
                    <img src={albumData?.albumThumbnail} alt={albumData?.albumTitle} className='w-full h-[350px] object-cover rounded-md' />
                    <span className='py-1 px-3 rounded-lg bg-blue-400 absolute top-[-10px] right-[-8px]'>{albumData?.albumType}</span>
                </aside>
                <aside className='basis-[70%] h-[350px] '>
                    <h1 className='text-4xl font-bold tracking-wider px-2 py-3 font-white'>{albumData?.albumTitle}</h1>
                    <p className='px-2 py-1'>
                        <span className='text-lg font-semibold mr-1 text-justify'>
                            Despriction:
                        </span>
                        <span>
                            {albumData?.albumDesc}
                        </span>
                    </p>
                    <p className='px-2 py-1'>
                        <span className='text-lg font-semibold mr-1 '>
                            Release Data:
                        </span>
                        <span>
                            {albumData?.albumReleaseDate}
                        </span>
                    </p>
                    <p className='px-2 py-1'>
                        <span className='text-lg font-semibold mr-1 '>
                            Language:
                        </span>
                        <span>
                            {albumData?.albumLang}
                        </span>
                    </p>
                    <p className='px-2 py-1'>
                        <span className='text-lg font-semibold mr-1 '>
                            Starcast :
                        </span>
                        <span>
                            {albumData?.albumStarcast}
                        </span>
                    </p>
                    <p className='px-2 py-1'>
                        <span className='text-lg font-semibold mr-1 '>
                            Music Director:
                        </span>
                        <span>
                            {albumData?.albumDirector}
                        </span>
                    </p>
                    <p className='px-2 py-1'>
                        <span className='text-lg font-semibold mr-1 '>
                            Songs Count:
                        </span>
                        <span>
                            {albumData?.albumSongsCount}
                        </span>
                    </p>
                </aside>
            </article>
            <main className='w-full mt-5 mb-8 rounded-b-md '>
                <header className='w-full '>
                    <h1 className='text-3xl font-semibold py-2 px-8'>Songs Collection</h1>
                </header>
                <table className='w-[94%] ml-8 mb-50'>
                    <thead >
                        <tr className='bg-gray-700 rounded-t-md '>
                            <td className='py-2 px-3 text-lg font-semibold'>Track.no</td>
                            <td className='py-2 px-3 text-lg font-semibold'>Poster</td>
                            <td className='py-2 px-3 text-lg font-semibold'>Song Name</td>
                            <td className='py-2 px-3 text-lg font-semibold'>Song Singers</td>
                            <td className='py-2 px-3 text-lg font-semibold'>Song Music Director</td>
                            <td className='py-2 px-3 text-lg font-semibold'>Duration</td>
                            <td className='py-2 px-3 text-lg font-semibold'>Size</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            songList.length > 0 ? (songList.map((song, index) => {
                                return <tr key={index} onClick={()=>handleSongChange(index)}className='bg-gray-500 hover:bg-gray-700 cursor-pointer  transition-all ease-in-out hover:border-t-[1px] hover:border-b-[1px] hover:border-gray-900 '>
                                    <td className='text-center'>{index + 1}</td>
                                    <td className='flex justify-center items-center px-2 py-2 '>
                                        <img src={song?.songThumbnail} alt={song?.songTitle} className='w-[60px] h-[60px] rounded-md' />
                                    </td>
                                    <td className=' px-2 '>{song?.songTitle}</td>
                                    <td className='p-1'>{song?.songSingers}</td>
                                    <td className='p-2'>{song?.songMusicDirector}</td>
                                    <td className='text-center p-2'>{song?.duration}</td>
                                    <td className='text-center p-2'>{song?.size}</td>
                                </tr>
                            })) : (<p className='text-center'>Song collection is not found</p>
                            )
                        }
                    </tbody>
                    <tfoot></tfoot>
                </table>
            </main>
        </section>
    )
}

export default AlbumDetails