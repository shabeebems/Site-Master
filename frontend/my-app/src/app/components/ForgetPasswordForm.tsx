'use client'

import { useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from './Loading';
import { apiCheck } from '../api/api';

const ForgetPasswordForm = () => {
  
    const [isLoading, setIsLoading] = useState(false);

    const [email, setEmail] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {

            const response = await apiCheck({ email }, 'auth/forget_password')
            
            if(response.success) {
                toast.success(response.message, { position: "top-right" });
            } else {
                toast.error(response.message || "Server side error!", { position: "top-right" });
            }

        } catch (error) {

            console.log(error)
            toast.error("Server side error!", { position: "top-right" });
            
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md mx-auto p-6 bg-white rounded-2xl shadow-xl space-y-8 animate-fadeIn">
            
            <ToastContainer />
            <div className="text-center space-y-3">
                <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
                    Welcome to 
                    <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent"> SiteMaster</span>
                </h2>
                <p className="text-gray-600 text-base font-medium">
                    Forgot your password? Reset it here
                </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>

                <div className="space-y-5">
                    <div className="relative">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">
                            Email Address <span className="text-red-500">*</span></label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            onChange={handleChange}
                            required
                            className="mt-1 w-full rounded-full border border-gray-300 py-3 px-5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            placeholder="Enter your email"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-full bg-blue-500 py-3 text-sm font-semibold text-white hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
                >
                    {isLoading ? <Loading /> : 'Submit'}
                </button>

            </form>

        </div>
    </div>
  )
}

export default ForgetPasswordForm
