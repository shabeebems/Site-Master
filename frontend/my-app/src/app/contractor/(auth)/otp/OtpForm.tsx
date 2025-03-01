'use client'

import React, { useEffect, useState } from 'react'

import { apiCheck } from '@/app/api/api'

// Loading component, working while loading on submit button
import Loading from '@/app/components/Loading';

// Success component, working while otp validation success
import Success from '../register/success';

// For message passing 
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Custom hooks
import { useAppSelector, useAppDispatch } from "@/app/store/hooks";

// Reduc for clear register details after otp success
import { clearUser } from '@/app/store/userSlice';

const OtpForm = () => {

    const [otp, setOtp] = useState(['', '', '', ''])

    // CountDown (Only resend after 60 seconds)
    const [count, setCount] = useState<number>(10)

    // Disable resend button
    const [showResend, setShowResend] = useState<boolean>(false)

    // Resend button didn't show until 'count' become '0'
    useEffect(() => {
      if(count > 0) {
        setTimeout(() => {
          setCount(count => count - 1)
        }, 1000)
      } else {
        // Enable resend button after 60 seconds
        setShowResend(true)
      }
    }, [count])

    // Make true while loading
    const [isLoading, setIsLoading] = useState(false)
    
    // To show register success component after submission
    const [isSubmitted, setIsSubmitted] = useState(false);

    const dispatch = useAppDispatch()

    // Save register user details from redux to the user variable
    const user = useAppSelector((state) => state.registerUser)

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Loading until complete
        setIsLoading(true);

        try {

          // Save register user details and otp to variable to pass to backend to validate
          const userDetails = {
            ...user,
            otp: otp.join('')
          }

          // Call api with user details and otp
          const response = await apiCheck(userDetails, 'auth/otp')
          
          if(response.success) {
            // Clear register user redux after success otp
            dispatch(clearUser())

            // Make isSubmitted true to call Success (Register success) component
            setIsSubmitted(true)
          
          } else {
            // Passing error messages
            toast.error(response.message || "Something went wrong!", { position: "top-right" });
          }

        } catch (error) {

          toast.error("Otp verification failed, please try again!", { position: "top-right" });
          console.error("Signup failed:", error);

        } finally {
          // Stop loading
          setIsLoading(false);
        }
    }

    const onChange = (i: number, value: string) => {
        // Save otp
        const newOtp = [...otp]
        newOtp[i] = value
        setOtp(newOtp)

        // -- For changing input field automatically
        if (value && i < otp.length - 1) {
          const nextInput = document.getElementById(`otp-input-${i + 1}`) as HTMLInputElement;
          if (nextInput) nextInput.focus();
        }
    }

    const resend = async (e: React.FormEvent) => {
      
      e.preventDefault()
      try {
          // Pass otp resend success message
          toast.success('Otp resended', { position: "top-right" })

          // Disable resend button to countdown restart
          setShowResend(false)

          // Countdown restart from 60
          setCount(10)

          // Api call to resend otp
          await apiCheck(user, 'auth/resendOtp')

      } catch (error) {

        console.log(error)
        toast.error("Resend otp failed, please try again!", { position: "top-right" });
      }
    }

  return (
    <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
      <div className="w-full max-w-md mx-auto p-6 bg-white rounded-2xl shadow-xl space-y-8 animate-fadeIn">
      <ToastContainer />
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tighter">
            <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
              {isSubmitted ? "Registration Success" : "Verify OTP"}
            </span>
          </h2>
          <p className="mt-3 text-lg text-gray-600 font-medium">
            {isSubmitted
              ? "Your account has been created successfully"
              : "Enter the 4-digit code sent to your email"}
          </p>
        </div>

        {/* Success Message or OTP Form */}
        {isSubmitted ? (
          <Success />
        ) : (
          <form className="mt-8 space-y-6" onSubmit={onSubmit}>
            {/* OTP Inputs */}
            <div className="flex justify-center space-x-4">
              {[0, 1, 2, 3].map((index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  inputMode="numeric"
                  onChange={(e) => onChange(index, e.target.value)}
                  maxLength={1}
                  value={otp[index]}
                  autoFocus={index === 0}
                  className="w-16 h-16 text-3xl text-center rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              ))}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full rounded-full bg-blue-500 py-3 text-sm font-semibold text-white hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isLoading ? <Loading /> : "Verify OTP"}
              </button>
            </div>

            {/* Resend Timer / Button */}
            {!showResend ? (
              <p className="mt-2 text-center text-sm text-gray-600">
                Resend button will show after {count}s
              </p>
            ) : (
              <p className="mt-2 text-center text-sm text-gray-600">
                Didn't receive code?{" "}
                <button
                  type="button"
                  onClick={resend}
                  className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                >
                  Resend OTP
                </button>
              </p>
            )}
          </form>
        )}
      </div>
    </div>

  )
}

export default OtpForm