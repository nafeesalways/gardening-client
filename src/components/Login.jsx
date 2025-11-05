import React, { use } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const { logIn, googleSignIn } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        navigate(location.state || "/");
        toast.success("Logged in successfully with Google!");
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Google sign-in failed. Please try again.");
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    logIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate(location.state || "/");
        toast.success("Logged in successfully!");
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        const errorMessage = error.message;
        toast.error(`Login failed: ${errorMessage}`);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 py-12">
      <Helmet>
        <title>GardenHub | Login</title>
      </Helmet>

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 mb-4 group"
          >
            <img
              className="w-8 h-8"
              src="https://cdn-icons-png.flaticon.com/128/8757/8757837.png"
              alt="GardenHub Logo"
            />
            <span className="text-2xl font-bold text-green-600 dark:text-green-400">
              GardenHub
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Sign in to continue growing with us
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="your@email.com"
                required
                className="input input-bordered w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent transition-all"
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                required
                className="input input-bordered w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent transition-all"
              />
              <div className="flex justify-end mt-2">
                <Link
                  to="/forgot-password"
                  className="text-xs text-green-600 dark:text-green-400 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full btn bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 border-none"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
            <span className="px-4 text-sm text-gray-500 dark:text-gray-400">
              Or continue with
            </span>
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
          </div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full btn btn-outline border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium py-3 rounded-lg flex items-center justify-center gap-3 transition-all duration-200"
          >
            <svg
              width="20"
              height="20"
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

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
            Don't have an account?{" "}
            <Link
              to="/auth/register"
              className="text-green-600 dark:text-green-400 font-semibold hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>

        {/* Additional Info */}
        <p className="text-center text-xs text-gray-500 dark:text-gray-500 mt-6">
          By signing in, you agree to our{" "}
          <Link to="/terms" className="hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
