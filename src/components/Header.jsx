import React, { use, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";
import userIcon from "../assets/image.png";
import { useState } from "react";
import { Tooltip } from "react-tooltip";

const Header = () => {
  const { user, logOut } = use(AuthContext);
  const [showLogout, setShowLogout] = useState(false);

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") === "light" ? "light" : "dark"
  );

  // Load theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setTheme(savedTheme);
    document.querySelector("html").setAttribute("data-theme", savedTheme);
  }, [theme]);

  // Toggle theme function
  const handleThemeChange = (event) => {
    const newTheme = event.target.checked ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleLogOut = () => {
    logOut()
      .then(() => toast.success("Logged out successfully"))
      .catch(() => toast.error("An error occurred"));
  };

  const Links = (
    <>
      <NavLink
        className={({ isActive }) =>
          `block font-bold mr-2 lg:mr-4 rounded transition-colors ${
            isActive
              ? "border-b-2 lg:border-b-4 font-bold text-xs sm:text-sm lg:text-lg text-green-500"
              : "font-semibold text-xs sm:text-sm lg:text-lg hover:text-green-400"
          }`
        }
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `block font-bold mr-2 lg:mr-4 rounded transition-colors ${
            isActive
              ? "border-b-2 lg:border-b-4 font-bold text-xs sm:text-sm lg:text-lg text-green-500"
              : "font-semibold text-xs sm:text-sm lg:text-lg hover:text-green-400"
          }`
        }
        to="/explore"
      >
        Explore Gardeners
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          `block font-bold mr-2 lg:mr-4 rounded transition-colors ${
            isActive
              ? "border-b-2 lg:border-b-4 font-bold text-xs sm:text-sm lg:text-lg text-green-500"
              : "font-semibold text-xs sm:text-sm lg:text-lg hover:text-green-400"
          }`
        }
        to="/tips"
      >
        Browse Tips
      </NavLink>

      {user && (
        <>
          <NavLink
            className={({ isActive }) =>
              `block font-bold mr-2 lg:mr-4 rounded transition-colors ${
                isActive
                  ? "border-b-2 lg:border-b-4 font-bold text-xs sm:text-sm lg:text-lg text-green-500"
                  : "font-semibold text-xs sm:text-sm lg:text-lg hover:text-green-400"
              }`
            }
            to="/share"
          >
            Share a Garden Tip
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `block font-bold mr-2 lg:mr-4 rounded transition-colors ${
                isActive
                  ? "border-b-2 lg:border-b-4 font-bold text-xs sm:text-sm lg:text-lg text-green-500"
                  : "font-semibold text-xs sm:text-sm lg:text-lg hover:text-green-400"
              }`
            }
            to="/dashboard"
          >
            Dashboard
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `block font-bold mr-2 lg:mr-4 rounded transition-colors ${
                isActive
                  ? "border-b-2 lg:border-b-4 font-bold text-xs sm:text-sm lg:text-lg text-green-500"
                  : "font-semibold text-xs sm:text-sm lg:text-lg hover:text-green-400"
              }`
            }
            to="/myTips"
          >
            My Tips
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <div className="navbar sticky top-0 z-50 px-2 sm:px-4">
      <div className="navbar-start">
        {/* Mobile menu dropdown */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg border"
          >
            {Links}
          </ul>
        </div>

        {/* Logo and Brand */}
        <div className="flex items-center -ml-4">
          <Link to="/" className="flex items-center">
            <img
              className="h-5 w-5 lg:h-12 lg:w-12 lg:mr-2 lg:-ml-3"
              src="https://cdn-icons-png.flaticon.com/128/6670/6670681.png"
              alt="GardenHub Logo"
            />
            <span className="btn btn-ghost text-sm lg:text-xl text-green-500 font-bold p-0">
              GardenHub
            </span>
          </Link>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{Links}</ul>
      </div>

      {/* Right side - Theme toggle, Profile, Auth buttons */}
      <div className="navbar-end flex items-center gap-2 sm:gap-4">
        {/* Theme Toggle */}
        <input
          type="checkbox"
          value="dark"
          className="lg:toggle lg:theme-controller scale-75 sm:scale-100 hidden"
          checked={theme === "dark"}
          onChange={handleThemeChange}
          aria-label="Toggle dark mode"
        />

        {/* User Profile */}
        <div className="relative">
          <div
            id="my-button"
            className="relative cursor-pointer group"
            onClick={() => setShowLogout(!showLogout)}
            aria-label={`User profile: ${user?.displayName || 'Guest'}`}
          >
            <img
              src={user ? user.photoURL : userIcon}
              alt="User profile"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-transparent hover:border-green-300 transition-colors"
            />
            
            {/* Tooltip */}
            <Tooltip
              anchorId="my-button"
              content={user?.displayName || 'Guest'}
              place="bottom"
              className="text-xs"
            />

            {/* Mobile username display */}
            {user && (
              <div
                className={`${
                  showLogout ? "block" : "hidden"
                } absolute top-12 right-0 text-black text-xs px-2 py-1 bg-green-200 rounded shadow-md z-10 lg:hidden whitespace-nowrap`}
              >
                {user.displayName}
              </div>
            )}

            {/* Desktop username display on hover */}
            {user && (
              <div className="hidden lg:block absolute top-12 right-0 text-black text-xs px-2 py-1 bg-green-200 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                {user.displayName}
              </div>
            )}
          </div>
        </div>

        {/* Authentication Buttons */}
        {user ? (
          <button
            onClick={handleLogOut}
            className="btn btn-sm sm:btn-md hover:bg-green-500 text-green-500 font-bold hover:text-white border-green-500 hover:border-green-500 text-xs sm:text-sm lg:text-base"
          >
            Log Out
          </button>
        ) : (
          <div className="flex gap-1 sm:gap-2">
            <Link
              to="/auth/login"
              className="btn btn-sm sm:btn-md font-bold text-xs sm:text-sm lg:text-base text-green-500 border-green-500 hover:bg-green-500 hover:text-white"
            >
              Sign In
            </Link>
            <Link
              to="/auth/register"
              className="btn btn-sm sm:btn-md font-bold text-xs sm:text-sm lg:text-base text-green-500 border-green-500 hover:bg-green-500 hover:text-white"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;