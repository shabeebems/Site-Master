import React from 'react'

const Success = () => {
  return (
    <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
      <svg
        className="mx-auto h-12 w-12 text-green-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 13l4 4L19 7"
        />
      </svg>
      <h3 className="mt-4 text-xl font-semibold text-green-600">
        Success!
      </h3>
      <p className="mt-2 text-sm text-green-600">
        Your account has been created successfully.
      </p>
      <div className="mt-8">
      <a
        href="/login"
        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        role="button"
      >
        Continue to Login
        <svg
          className="ml-2 -mr-1 h-5 w-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </a>
    </div>
    </div>
  )
}

export default Success