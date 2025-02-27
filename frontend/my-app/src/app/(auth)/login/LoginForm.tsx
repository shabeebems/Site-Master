'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiCheck } from '../../api/api';

import Loading from '../../components/Loading';

import { useAppDispatch } from "../../store/hooks";
import { setEmail } from '@/app/store/protect';

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormData {
  email: string,
  password: string
}

export default function LoginForm() {

  const dispatch = useAppDispatch();

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await apiCheck(formData, 'auth/login')
      if(response.success) {
        toast.success(response.message, { position: "top-right" });
        // console.log(response)
        dispatch(setEmail(response.data.email))
        router.push('/dashboard');
      } else {
        toast.error(response.message || "Something went wrong!", { position: "top-right" });
      }
    } catch (error: any) {
      console.log(error)
      toast.error("Something went wrong!", { position: "top-right" });
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="w-full max-w-md space-y-8 animate-fadeIn">
      <ToastContainer />
      <div className="text-center">
      <h2 className="text-4xl font-extrabold text-gray-900 tracking-tighter bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
        SiteMaster
      </h2>
        <p className="mt-3 text-lg text-gray-600 font-medium">
          Sign in to manage your construction projects
        </p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4 rounded-md">
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={handleChange}
              required
              className="relative block w-full rounded-lg border-0 py-3 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-amber-600 transition-all duration-200"
              placeholder="Email address"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={handleChange}
              required
              className="relative block w-full rounded-lg border-0 py-3 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-amber-600 transition-all duration-200"
              placeholder="Password"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm">
            <a href="#" className="font-medium text-amber-600 hover:text-amber-500 transition-colors">
              Forgot your password?
            </a>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="group relative flex w-full justify-center rounded-lg bg-amber-600 px-4 py-3 text-sm font-semibold text-white hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isLoading ? (
            <Loading />
          ) : (
            'Sign in'
          )}
        </button>

        <p className="mt-2 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/register" className="font-medium text-amber-600 hover:text-amber-500 transition-colors">
            Register here
          </a>
        </p>
      </form>
    </div>
  );
}