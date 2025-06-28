import React from 'react'
import ProfileSidebar from './ProfileSidebar'
import ProfileContent from './ProfileContent'


const ProfileContainer = () => {
  return (
    <section className='flex w-[100%] h-[100vh]'>
        <ProfileSidebar/>
        <ProfileContent/>
    </section>
  )
}

export default ProfileContainer