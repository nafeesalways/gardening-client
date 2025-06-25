import React, { use } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";
import { Helmet } from 'react-helmet-async';

const Login = () => {
  const { logIn,googleSignIn  } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
    const handleGoogleSignIn =()=>{
    googleSignIn().then((result)=>{
      console.log(result)
    }).catch((error)=>{
      console.log(error)
    })
  }
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    logIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
		navigate(`${location.state ? location.state : '/'}`)
        toast.success("User created successfully!");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(`Error (${errorCode}): ${errorMessage}`);
      });
  };
  return (
    <div className="mx-auto m-7 max-w-md p-8 space-y-3 rounded-xl bg-gradient-to-r from-green-200 via-lime-200 to-amber-100  shadow-lg">
      <Helmet>
              <title>GardenHub | Login</title>
            </Helmet>
      <h1 className="text-3xl font-bold text-center text-green-500">
        Login Your Account
      </h1>
      <form
        onSubmit={handleLogin}
        noValidate=""
        action=""
        className="space-y-6"
      >
        <div className="space-y-1 text-sm">
          <label htmlFor="username" className="block dark:text-gray-600">
            Email
          </label>
          <input
            type="text"
            name="email"
            id="username"
            placeholder="Enter Email"
            className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
			required
          />
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="password" className="block dark:text-gray-600">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
			required
          />
          <div className="flex justify-end text-xs dark:text-gray-600">
            <a rel="noopener noreferrer" href="#">
              Forgot Password?
            </a>
          </div>
        </div>
        <button
          type="submit"
          className="block w-full btn p-3 text-center px-6 py-3 text-white font-semibold rounded-full shadow-md 
                bg-gradient-to-r from-green-500 via-lime-400 to-amber-300 
                hover:from-green-600 hover:via-lime-500 hover:to-yellow-400 
                transition-all duration-300 ease-in-out"
        >
          Sign in
        </button>
      </form>
      <div className="flex items-center pt-4 space-x-1">
        <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
        <p className="px-3 text-sm dark:text-gray-600">
         Or
        </p>
        <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
      </div>
      <div className="flex justify-center space-x-4">
        <button onClick={handleGoogleSignIn}
          className="btn px-4 py-2 text-white font-medium flex items-center gap-2 
                   bg-gradient-to-r from-green-600 via-lime-500 to-amber-400 
                   hover:from-green-700 hover:via-lime-600 hover:to-yellow-500 
                   border-none rounded-lg shadow-md transition-all duration-300"
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Continue with Google
        </button>
      </div>
      <p className="text-xs text-center sm:px-6 dark:text-gray-600">
        Don't have an account?
        <Link
          to="/auth/register"
          rel="noopener noreferrer"
          href="#"
          className="underline dark:text-gray-800"
        >
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
