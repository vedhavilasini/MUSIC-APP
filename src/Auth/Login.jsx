import { signInWithEmailAndPassword } from 'firebase/auth';
import { __Auth } from "../backend/firebaseconfig.js"
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { IoEye, IoEyeOff } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import Spinner from '../helper/Spinner.jsx';


const Login = () => {
  let navigate = useNavigate();
  let [userData, setuserData] = useState({
    email: "",
    password: ""
  });
  let { showPassword1, setShowPassword1 } = useState(false);
  let togglePassword1 = () => {
    setShowPassword1(!showPassword1);
  }
  let [isLoading, setIsLoading] = useState(false)
  let { email, password } = userData;
  let handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setuserData({ ...userData, [name]: value });
  }
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let loggedInUser = await signInWithEmailAndPassword(__Auth, email, password)
      console.log(loggedInUser)
      if (loggedInUser.user.emailVerified === true) {
        toast.success("logged in succssfilly")
        navigate("/")
      } else {
        toast.error("email is not yet verified")
      }
    } catch (error) {
      toast.error(error.code.slice(5));
    }
  }
  return (
    <section className='w-full min-h-[90vh] flex text-white justify-center items-center bg-gradient-to-t from-gray-700 to-gray-100'>
      <article className='w-[30%] bg-gradient-to-b from-gray-700 to-gray-500 p-5 rounded-2xl'>
        <header className='text-center text-3xl font-bold py-3'>
          <h1>Login here </h1>
        </header>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col mb-3 p-3'>
            <label htmlFor="email" className='font-semibold text-lg mb-2'>Email</label>
            <input type="email" id="email" placeholder="enter your email" className='outline-none border border-purple-900 rounded-lg p-2' name="email" value={email} onChange={handleInputChange} />
          </div>
          <div className='flex flex-col mb-3 p-3 relative'>
            <label htmlFor="password" className='font-semibold text-lg mb-2'>password</label>
            <input type={showPassword1 ? "text" : "password"} id="password" placeholder="enter your password" className='outline-none border border-purple-900 rounded-lg p-2' name="password" value={password} onChange={handleInputChange} />
            <span className="absolute right-3 bottom-3 pr-1.5 transform -translate-y-1/2 cursor-pointer text-xl text-gray-300" onClick={togglePassword1}>
              {showPassword1 ? <IoEye /> : <IoEyeOff />}
            </span>
          </div>
          <div className='flex flex-col mb-3 p-3'>
            <button className='p-2 rounded-lg cursor-pointer bg-blue-600 hover:bg-gray-600 text-black'>Login</button>
          </div>
          <div className="flex justify-center items-center mb-2">
            <NavLink to={"/auth/register"} className="hover:text-blue-500 hover:underline">Don't have an account</NavLink>
          </div>
          <div className="flex justify-center items-center">
            <NavLink to={"/auth/reset-password"} className="hover:text-blue-500 hover:underline">Forget password</NavLink>
          </div>

        </form>
      </article>
      {isLoading && (<section className='w-[100vw] h-[100vh] bg-black/50 fixed top-0'>
        <Spinner />
      </section>)}

    </section>
  )
}

export default Login