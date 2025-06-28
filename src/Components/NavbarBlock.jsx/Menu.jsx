import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthUserContext } from '../../Context/AuthContextApi'
import { IoIosLogOut } from 'react-icons/io';
import { BackendUserContext } from '../../Context/FetchUserContext';

const Menu = () => {
    let { authUser,logout } = useContext(AuthUserContext);
    console.log(authUser);
    let {userData}=useContext(BackendUserContext);
    let role=userData?.role;
    console.log(role);
    // ^ this is for unknown user 
    let AnonymousUser = () => {
        return (<>
           
            <li>       
                <NavLink to={"/auth/login"} className={({ isActive }) => `${isActive ? "bg-blue-800" : " "} px-4 py-2 font-semibold hover:bg-blue-600 rounded-full cursor-pointer text-black`}>Login</NavLink>
            </li>
            <li>
                <NavLink to={"/auth/register"} className={({ isActive }) => `${isActive ? "bg-blue-800" : " "} px-4 py-2 font-semibold hover:bg-blue-600 rounded-full cursor-pointer text-black`}>Register</NavLink>
            </li>
        </>
        )
    };
    //^ this is for authenticated user
    let Authenticated = () => {
        return (<>
        {role==="admin"&&(<li><NavLink to={"/admin"} className={({ isActive }) => `${isActive ? "bg-blue-800" : " "} px-4 py-2 font-semibold hover:bg-blue-600 rounded-full cursor-pointer flex gap-2 items-center text-black`}>Admin</NavLink></li>)}
            <li>
                <NavLink to={"/user/profile"} className={({ isActive }) => `${isActive ? "bg-blue-800" : " "} px-4 py-2 font-semibold hover:bg-blue-600 rounded-full cursor-pointer flex gap-2 items-center text-black`}>
                <span>{authUser?.displayName}</span>
                <img src={authUser?.photoURL} className='w-[20px] h-[20px] rounded-full'/></NavLink>
            </li>
            <li>
                <button onClick={()=>{logout()}} className={`px-4 py-2 font-semibold hover:bg-red-600 rounded-full cursor-pointer flex justify-evenly items-center gap-2 text-black`}>
                    <span>Logout</span>
                    <span><IoIosLogOut/></span>
                </button>
            </li></>
        )
    }
    return (
        <aside className="basis-[30%] h-[70px]">
            <ul className="W-full h-[70px] flex justify-evenly items-center">
                <li>
                    <NavLink to={"/"} className={({ isActive }) => `${isActive ? "bg-blue-800" : " "} px-4 py-2 font-semibold hover:bg-blue-600 rounded-full cursor-pointer text-black`}>Home</NavLink>
                </li>
                {authUser === null ? <AnonymousUser /> : <Authenticated />}

            </ul>
        </aside>
    )
}

export default Menu