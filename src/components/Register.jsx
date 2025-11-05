import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const Register = () => {
  const { createUser, setUser, updateUser } = use(AuthContext);
  const [nameError, setNameError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.target;
    const name = form.name.value;
    const password = form.password.value;
    const photo = form.photo.value;
    const email = form.email.value;

    // Validate name
    if (name.length < 6) {
      setNameError("Name should be at least 6 characters");
      setIsSubmitting(false);
      return;
    } else {
      setNameError("");
    }

    // Validate password
    const passwordRegEx = /(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
    if (!passwordRegEx.test(password)) {
      toast.error(
        "Password must contain: 1 uppercase, 1 lowercase, 1 special character, and be 8+ characters long"
      );
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await createUser(email, password);
      const user = result.user;

      await updateUser(result.user, { displayName: name, photoURL: photo });
      setUser({ ...user, displayName: name, photoURL: photo });

      navigate("/");
      toast.success("Account created successfully! Welcome to GardenHub");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(`Registration failed: ${errorMessage}`);
      console.error(`Error (${errorCode}): ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 py-12">
      <Helmet>
        <title>GardenHub | Register</title>
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
            Join Our Community
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Create an account to start sharing your gardening expertise
          </p>
        </div>

        {/* Register Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 p-8">
          <form onSubmit={handleRegister} className="space-y-5">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Your Name"
                required
                className="input input-bordered w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent transition-all"
              />
              {nameError && (
                <p className="text-xs text-red-500 dark:text-red-400 mt-1 flex items-center gap-1">
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18.101 12.93a1 1 0 00-1.414-1.414L10 14.586 7.707 12.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {nameError}
                </p>
              )}
            </div>

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

            {/* Photo URL Field */}
            <div>
              <label
                htmlFor="photo"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
              >
                Photo URL
              </label>
              <input
                type="url"
                name="photo"
                id="photo"
                placeholder="https://example.com/photo.jpg"
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
                placeholder="Create a strong password"
                required
                className="input input-bordered w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent transition-all"
              />
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 border-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating account...
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                  Create Account
                </>
              )}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="text-green-600 dark:text-green-400 font-semibold hover:underline"
            >
              Sign in here
            </Link>
          </p>
        </div>

        {/* Legal Footer */}
        <p className="text-center text-xs text-gray-500 dark:text-gray-500 mt-6">
          By registering, you agree to our{" "}
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

export default Register;
