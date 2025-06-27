import React from 'react';
import garden from "../garden.json";
import Lottie from "lottie-react";
import { Link } from 'react-router';

const ErrorPage = () => {
  return (
       <div className="flex items-center justify-center min-h-screen px-4">
      <div className="flex flex-col md:flex-row items-center gap-10 max-w-4xl bg-white shadow-lg rounded-lg p-6">
        {/* Left: Image */}
          <div id="garden-lottie">
          <Lottie
            animationData={garden}
            loop={true}
            autoplay={true}
            style={{ width: 500, height: 400 }}
          ></Lottie>
        </div>

        {/* Right: Text */}
        <div className="text-center md:text-left w-full md:w-1/2">
          <h1 className="text-7xl font-bold text-green-600">404</h1>
          <p className="text-2xl md:text-3xl text-green-500 font-bold mt-4">
            Oops! Page not found.
          </p>
          <p className="mt-2 text-gray-600">
            The page you're looking for doesn’t exist or has been moved.
          </p>

          <div className="mt-6">
            <Link
              to="/"
              className="inline-block px-6 py-3 cursor-pointer  border shadow-md  text-sm text-green-800 font-medium  border-green-400  bg-green-200 rounded"
            >
              Go to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
