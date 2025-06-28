import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth"
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { IoEye, IoEyeOff } from "react-icons/io5";
import { __Auth } from "../backend/firebaseconfig.js"
import { NavLink, useNavigate } from "react-router-dom";
import Spinner from "../helper/Spinner.jsx";

const Register = () => {
  let navigate = useNavigate();
  let [userData, setuserData] = useState({
    username: "",   
    email: "",
    password: "",
    confirmPassword: ""
  });
  //! destructing of an user data
  let { username, email, password, confirmPassword } = userData;

  let handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setuserData({ ...userData, [name]: value });
  }
  let [isLoading, setIsLoading] = useState(false)
  let handleSubmitData = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (password === confirmPassword) {
        // ! create the user with email and password
        let registeredUser = await createUserWithEmailAndPassword(__Auth, email, password)
        console.log(registeredUser)
        sendEmailVerification(registeredUser.user);
        // ! update profile name and photo which is not updated
        updateProfile(registeredUser.user, {
          displayName: username,
          photoURL: "https://th.bing.com/th/id/OIP.mMz3b-Tnh_-Qwg3atrTl_AHaGO?rs=1&pid=ImgDetMain"
        })

        toast.success(`Email verified successfully ${email}`)
        toast.success("user has been verified successfully");
        navigate("/auth/login")
      }
      else {
        toast.error("Password does not match")
        setuserData({
          password: "",
          confirmPassword: ""
        })
      }
    }
    catch (error) {
      toast.error(error.code.slice(5))
    }
    setIsLoading(false)
  }
  let [showPassword1, setShowPassword1] = useState(false);
  let [showPassword2, setShowPassword2] = useState(false);

  let togglePassword1 = () => {
    setShowPassword1(!showPassword1);
  }
  let togglePassword2 = () => {
    setShowPassword2(!showPassword2);
  }
  return (
    <section className='w-full min-h-[90vh] flex text-white justify-center items-center bg-gradient-to-t from-gray-700 to-gray-100 '>
      <article className='w-[30%] bg-gradient-to-b from-gray-700 to-gray-300 p-5 rounded-2xl'>
        <header className='text-center text-3xl font-bold py-3'>
          <h1>Register here </h1>
        </header>
        <form onSubmit={handleSubmitData}>
          <div className='flex flex-col mb-3 p-3'>
            <label htmlFor="username" className='font-semibold text-lg mb-2'>Username</label>
            <input type="text" id="username" placeholder='Enter your name' className='outline-none border border-purple-900 rounded-lg p-2' name="username" value={username} onChange={handleInputChange} />
          </div>
          <div className='flex flex-col mb-3 p-3'>
            <label htmlFor="email" className='font-semibold text-lg mb-2'>Email</label>
            <input type="email" id="email" placeholder="enter your email" className='outline-none border border-purple-900 rounded-lg p-2' name="email" value={email} onChange={handleInputChange} />
          </div>
          <div className='flex flex-col mb-3 p-3 relative'>
            <label htmlFor="password" className='font-semibold text-lg mb-2'>password</label>
            <input type={showPassword1 ? "text" : "password"} id="password" placeholder="enter your password" className='outline-none border border-purple-900 rounded-lg p-2 appearance-none' name="password" value={password} onChange={handleInputChange} />
            <span className="absolute right-3 bottom-3 pr-1.5 transform -translate-y-1/2 cursor-pointer text-xl text-gray-300" onClick={togglePassword1}>
              {showPassword1 ? <IoEye /> : <IoEyeOff />}
            </span>
          </div>
          <div className='flex flex-col mb-3 p-3 relative'>
            <label htmlFor="confirmPassword" className='font-semibold text-lg mb-2'>Confirm password</label>
            <input type={showPassword2 ? "text" : "password"}
              id="confirmPassword"
              placeholder="Confirm Password"
              className='outline-none border border-purple-900 rounded-lg p-2 appearance-none'
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleInputChange} />
            <span className="absolute right-3 bottom-3 pr-1.5 transform -translate-y-1/2 cursor-pointer text-xl text-gray-300" onClick={togglePassword2}>
              {showPassword2 ? <IoEye /> : <IoEyeOff />}
            </span>
          </div>
          <div className='flex flex-col mb-3 p-3'>
            <button className='p-2 rounded-lg cursor-pointer bg-blue-600 hover:bg-gray-600'>Register</button>
          </div>
          <div className="flex justify-center items-center">
            <NavLink to={"/auth/login"} className="hover:text-blue-500 hover:underline">Already have an account</NavLink>
          </div>

        </form>
      </article>
      {isLoading && (<section className='w-[100vw] h-[100vh] bg-black/50 fixed top-0'>
        <Spinner/>
      </section>)}
    </section>
  )
}

export default Register