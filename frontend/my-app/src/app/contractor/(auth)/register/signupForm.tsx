'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

import { useAppDispatch } from "@/app/store/hooks";

// Redux
import { setUser } from '@/app/store/userSlice';

import { apiCheck } from '@/app/api/api';

// Loading component, working while loading on submit button
import Loading from '@/app/components/Loading';

// For message passing 
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignupForm() {

  // Make true while loading
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const router = useRouter();

  // Define a custon dispatch hook
  const dispatch = useAppDispatch();

  // Function will trigger while submitting
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Loading until complete
    setIsLoading(true);

    try {
      // - Call API for signup
      const response = await apiCheck(formData, 'auth/signup')

      if(response.success) {

        // Store a temporary cookie to get access of otp page
        Cookies.set('signup_verified', 'true', {
          expires: new Date(Date.now() + 60 * 10000) // - 10 mins
        });

        // Save form details to redux to store db after otp submition
        dispatch(setUser(formData))

        // Passing success message
        toast.success(response.message, { position: "top-right" });

        // Render otp page
        router.push('/contractor/otp');

      } else {
        // Re-render register while any unexpected error happens
        router.push('/contractor/register');
      }
      console.log('ee')
      
    } catch (error: any) {
      // Passing error message (async functions handling 400 status errors in catch)
      if (error.response) {
        const { data } = error.response;

        toast.error(data?.message || "Signup error, please try again", { position: "top-right" });

        console.error("Signup error:", error.response);

      } else {
        // -- Handle unexpected errors
        toast.error("Network error, please try again!", { position: "top-right" });
        console.error("Signup failed:", error);
      }

    } finally {
      // Loading disable after complete
      setIsLoading(false);
    }

  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const formFields = [
    { name: 'name', type: 'text', placeholder: 'Name' },
    { name: 'email', type: 'email', placeholder: 'Email address' },
    { name: 'password', type: 'password', placeholder: 'Password' },
    { name: 'confirmPassword', type: 'password', placeholder: 'Confirm Password' }
  ];

  return (
    <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
      <div className="w-full max-w-md mx-auto p-6 bg-white rounded-2xl shadow-xl space-y-8 animate-fadeIn">
        {/* For passing messages */}
        <ToastContainer />

        {/* Header Section */}
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tighter">
            <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
              SiteMaster
            </span>
          </h2>
          <p className="mt-3 text-lg text-gray-600 font-medium">
            Sign up to manage your construction projects
          </p>
        </div>

        {/* Form Section */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-5 rounded-md">
            {formFields.map((field: any) => (
              <div key={field.name} className="relative">
                <label htmlFor={field.name} className="sr-only">
                  {field.placeholder}
                </label>
                <input
                  {...field}
                  value={formData[field.name as keyof FormData]}
                  onChange={handleChange}
                  required
                  className="w-full rounded-full border border-gray-300 py-3 px-5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-full bg-blue-500 py-3 text-sm font-semibold text-white hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? <Loading /> : 'Sign up'}
            </button>
          </div>

          {/* Sign In Link */}
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/contractor/login" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
              Sign in here
            </a>
          </p>
        </form>
      </div>
    </div>

  );
}