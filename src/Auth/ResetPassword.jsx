import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom'
import { __Auth } from '../backend/firebaseconfig';
import Spinner from '../helper/Spinner';

const ResetPassword = () => {
    let navigate = useNavigate();
    let [email, setEmail] = useState("");
    let [isLoading, setIsLoading] = useState(false);
    let handleInputChange = (e) => {
        let value = e.target.value;
        setEmail(value)
    }
    let handleSumbit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            // !reset password
            await sendPasswordResetEmail(__Auth, email)
            toast.success(`reset password have sent to your registered ${email}`)
            navigate("/auth/login")

        } catch (error) {
            toast.error(error.code.slice(5));
        }
        setIsLoading(false);

    }
    return (
        <section className='w-full min-h-[90vh] flex text-white justify-center items-center'>
            <article className='w-[30%] bg-gray-700 p-5'>
                <header className='text-center text-3xl font-bold py-3'>
                    <h1>RESET PASSWORD</h1>
                </header>
                <form
                    onSubmit={handleSumbit}
                >
                    <div className='flex flex-col mb-3 p-3'>
                        <label htmlFor="email" className='font-semibold text-lg mb-2'>Email</label>
                        <input type="email" id="email" placeholder="enter your email" className='outline-none border border-purple-900 rounded-lg p-2'
                            value={email} onChange={handleInputChange}
                        />
                    </div>
                    <div className='flex flex-col mb-3 p-3'>
                        <button className='p-2 rounded-lg cursor-pointer bg-blue-600 hover:bg-gray-600'>ResetPassword</button>
                    </div>
                    <div className="flex justify-center items-center">
                        <NavLink to={"/auth/login"} className="hover:text-blue-500 hover:underline">Cancel</NavLink>
                    </div>

                </form>
            </article>
            {isLoading && (<section className='inset-0 w-full h-full bg-black/50 fixed top-0'>
                <Spinner/>
            </section>)}

        </section>
    )
}

export default ResetPassword