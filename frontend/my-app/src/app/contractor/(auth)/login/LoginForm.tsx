'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { apiCheck } from '@/app/api/api';

import Loading from '@/app/components/Loading';

import { useAppDispatch } from "@/app/store/hooks";

// Redux to store email after login submission to protect frontend
import { setEmail } from '@/app/store/protect';

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormData {
  email: string,
  password: string
}

export default function LoginForm() {

  // Define a custon dispatch hook
  const dispatch = useAppDispatch();

  const router = useRouter();

  // Make true while loading
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  })

  // Function will trigger changing inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // Function will trigger while submitting
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Loading until complete
    setIsLoading(true);

    try {
      // - Call API for validate login formData
      const response = await apiCheck(formData, 'auth/login')
      if(response.success) {

        // Passing success message
        toast.success(response.message, { position: "top-right" });

        // save email to redux to validate frontend
        dispatch(setEmail(response.data.email))

        // Navigate to dashboard
        router.push('/dashboard');

      } else {
        toast.error(response.message || "Server side error!", { position: "top-right" });
      }

    } catch (error: any) {

      // -- Handle unexpected errors
      console.log(error)
      toast.error("Server side error!", { position: "top-right" });

    } finally {
      // Loading disable after complete
      setIsLoading(false)
    }
  };

  return (
    <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
      <div className="w-full max-w-md mx-auto p-6 bg-white rounded-2xl shadow-xl space-y-8 animate-fadeIn">
        <ToastContainer />
        
        {/* Header Section */}
        <div className="text-center space-y-3">
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
            Welcome to 
            <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent"> SiteMaster</span>
          </h2>
          <p className="text-gray-600 text-base font-medium">
            Sign in to manage your construction projects
          </p>
        </div>

        {/* Form Section */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-5">
            {/* Email Field */}
            <div className="relative">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
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

            {/* Password Field */}
            <div className="relative">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-full border border-gray-300 py-3 px-5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Enter your password"
              />
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors">
              Forgot your password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-full bg-blue-500 py-3 text-sm font-semibold text-white hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
          >
            {isLoading ? <Loading /> : 'Sign In'}
          </button>

          {/* Register Link */}
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/contractor/register" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
              Register here
            </a>
          </p>
        </form>
      </div>
    </div>

  );
}