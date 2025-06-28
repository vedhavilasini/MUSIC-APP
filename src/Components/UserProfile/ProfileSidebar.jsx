import React from 'react'
import { NavLink } from 'react-router-dom'
import { RiAccountCircleFill } from "react-icons/ri";
import { IoPersonAddSharp } from "react-icons/io5";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";

const ProfileSidebar = () => {
    return (
        <>
            <aside className='basis[16%] bg-gradient-to-b from-gray-300 to-gray-700 h-[calc(100vh-70px)] text-white'>
                <nav className='w-full'>
                    <ul className='w-full p-5 flex flex-col'>
                        <li>
                            <NavLink 
                            to={"/user/profile"}
                            className={({isActive})=>`${isActive?"bg-blue-600 hover:bg-blue-500":""}px-4 py-2 rounded-md flex items-center gap-2 mb-6 cursor-pointer font-semibold hover:bg-blue-700`}end>
                                <span className='text-xl'><RiAccountCircleFill /></span>
                                <span> My account</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/user/profile/add-profile"} className={({isActive})=>`${isActive?"bg-blue-600 hover:bg-blue-500":""}px-4 py-2 rounded-md flex items-center gap-2 mb-6 cursor-pointer font-semibold hover:bg-blue-700`}>
                                <span className='text-xl'><IoPersonAddSharp /></span>
                                <span>Add profile</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/user/profile/upload-profile-photo"} className={({isActive})=>`${isActive?"bg-blue-600 hover:bg-blue-500":""}px-4 py-2 rounded-md flex items-center gap-2 mb-6 cursor-pointer font-semibold hover:bg-blue-700`}>
                                <span className='text-xl'><MdOutlineAddAPhoto /></span>
                                <span>Upload Profile Photo</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/user/profile/change-password"} className={({isActive})=>`${isActive?"bg-blue-600 hover:bg-blue-500":""}px-4 py-2 rounded-md flex items-center gap-2 mb-6 cursor-pointer font-semibold hover:bg-blue-700`}>
                                <span className='text-xl'><RiLockPasswordFill /></span>
                                <span>Change password</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/user/profile/delete-account"} className={({isActive})=>`${isActive?"bg-blue-600 hover:bg-blue-500":""}px-4 py-2 rounded-md flex items-center gap-2 mb-6 cursor-pointer font-semibold hover:bg-blue-700`}>
                                <span className='text-xl'><MdDeleteForever /></span>
                                <span> Delete account</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </aside>
        </>
    )
}

export default ProfileSidebar