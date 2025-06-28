import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react'
import { __Auth } from '../backend/firebaseconfig';
import toast from 'react-hot-toast';

//! step-1:create context for the user
export let AuthUserContext=createContext(null)

const AuthContextApi = ({children}) => {
    let[authUser,setAuthUser]=useState(null||{});

    useEffect(()=>{
        onAuthStateChanged(__Auth,(userInfo)=>{
            if(userInfo?.emailVerified===true){
                window.localStorage.setItem("UserToken",userInfo?.accessToken);
                setAuthUser(userInfo);
            }else{
                setAuthUser(null);
                window.localStorage.removeItem("UserToken");
            }
        })
    },[])
    // ! logout functionality 
    let logout=async()=>{
        try{
            await signOut(__Auth);
            window.localStorage.removeItem("UserToken")
            toast.success("logout successfully")
            setTimeout(()=>{
                window.location.assign("/");
            },15000)
        }catch(error){
            toast.error(error.code.slice(5));
        }
    }
  return (
   <AuthUserContext.Provider value={{authUser,logout}}>
      {children}
   </AuthUserContext.Provider>
  )
}

export default AuthContextApi