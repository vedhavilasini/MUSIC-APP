import React, { useContext } from 'react'
import AlbumLandingSidebar from './AlbumLandingSidebar'
import AlbumLandingConent from './AlbumLandingConent'
import { GlobalAudioPlayer } from '../Context/AudioPlayerContext'
import CustomAudioPlayer from 'react-pro-audio-player'

const AlbumLandlingContainer = () => {
  let{songs,setSongs,isPlaying,setIsPlaying,currentSongIndex,setCurrentSongIndex}=useContext(GlobalAudioPlayer);
  return (
    <section className='w-[100vw] min-h-[calc(100vh-70px)] flex'>
      <AlbumLandingSidebar/>
      <AlbumLandingConent/>
      {
        currentSongIndex !==null&&(<div className='w-full fixed bottom-0'>
          <CustomAudioPlayer
          songs={songs}
          isPlaying={isPlaying}
          currentSongIndex={currentSongIndex}
          onPlayPauseChange={setIsPlaying}
          onSongChange={setCurrentSongIndex}
          songUrlKey="songFile"
          songNameKey="songTitle"
          songThumbnailKey="songThumbnail" 
          songSingerKey="songSingers"
        />

        </div>)
      }
    </section>
  )
}

export default AlbumLandlingContainer