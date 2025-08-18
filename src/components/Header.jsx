import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";
import userIcon from "../assets/image.png";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") === "dark" ? "dark" : "light"
  );

  // Load theme on mount
  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Logout
  const handleLogOut = () => {
    logOut()
      .then(() => toast.success("Logged out successfully"))
      .catch(() => toast.error("An error occurred"));
  };

  // Links
  const Links = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `font-semibold mx-1 sm:mx-2 ${
            isActive ? "text-green-500 border-b-2 border-green-500" : "hover:text-green-500"
          }`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/explore"
        className={({ isActive }) =>
          `font-semibold mx-1 sm:mx-2 ${
            isActive ? "text-green-500 border-b-2 border-green-500" : "hover:text-green-500"
          }`
        }
      >
        Explore Gardeners
      </NavLink>
      <NavLink
        to="/tips"
        className={({ isActive }) =>
          `font-semibold mx-1 sm:mx-2 ${
            isActive ? "text-green-500 border-b-2 border-green-500" : "hover:text-green-500"
          }`
        }
      >
        Browse Tips
      </NavLink>

      {user && (
        <>
          <NavLink
            to="/share"
            className={({ isActive }) =>
              `font-semibold mx-1 sm:mx-2 ${
                isActive ? "text-green-500 border-b-2 border-green-500" : "hover:text-green-500"
              }`
            }
          >
            Share Tip
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `font-semibold mx-1 sm:mx-2 ${
                isActive ? "text-green-500 border-b-2 border-green-500" : "hover:text-green-500"
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/myTips"
            className={({ isActive }) =>
              `font-semibold mx-1 sm:mx-2 ${
                isActive ? "text-green-500 border-b-2 border-green-500" : "hover:text-green-500"
              }`
            }
          >
            My Tips
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <div className="navbar sticky top-0 z-50 bg-base-200 px-4 sm:px-6 lg:px-10 shadow-md">
      {/* Left: Logo + Mobile menu */}
      <div className="navbar-start">
        {/* Mobile dropdown */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-8 6h8" />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {Links}
            <div className="mt-2 border-t pt-2">
              {user ? (
                <button
                  onClick={handleLogOut}
                  className="btn btn-sm w-full bg-green-600 text-white hover:bg-green-700"
                >
                  Log Out
                </button>
              ) : (
                <>
                  <Link to="/auth/login" className="btn btn-sm w-full mb-1">
                    Sign In
                  </Link>
                  <Link to="/auth/register" className="btn btn-sm w-full">
                    Register
                  </Link>
                </>
              )}
            </div>
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="https://cdn-icons-png.flaticon.com/128/6670/6670681.png"
            alt="GardenHub Logo"
            className="h-6 w-6 sm:h-10 sm:w-10"
          />
          <span className="font-bold text-green-600 text-sm sm:text-lg">GardenHub</span>
        </Link>
      </div>

      {/* Center: Desktop links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal">{Links}</ul>
      </div>

      {/* Right: Theme toggle + Auth/Profile */}
      <div className="navbar-end flex items-center gap-3">
        {/* Theme toggle (always visible) */}
        <input
          type="checkbox"
          className="lg:toggle lg:toggle-success hidden"
          checked={theme === "dark"}
          onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle dark mode"
        />

        {/* Profile dropdown if logged in */}
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user.photoURL || userIcon} alt="profile" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 bg-base-100 rounded-box shadow w-52"
            >
              <li className="font-semibold">{user.displayName}</li>
              <li>
                <button
                  onClick={handleLogOut}
                  className="btn btn-sm bg-green-600 text-white hover:bg-green-700"
                >
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="hidden sm:flex gap-2">
            <Link to="/auth/login" className="btn btn-sm border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
              Sign In
            </Link>
            <Link to="/auth/register" className="btn btn-sm bg-green-600 text-white hover:bg-green-700">
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
