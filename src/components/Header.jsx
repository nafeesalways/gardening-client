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


  return (
    <header className="bg-green-100 border-b border-green-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          className="text-green-800 font-bold text-xl flex items-center gap-2"
        >
          🌿 GardenHub
        </a>

        <input
          id="menu-toggle"
          type="checkbox"
          className="peer hidden"
          aria-label="Toggle navigation menu"
        />
        <label
          htmlFor="menu-toggle"
          className="md:hidden cursor-pointer"
          aria-expanded="false"
          aria-controls="nav-menu"
        >
          <svg
            className="w-6 h-6 text-green-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </label>

        <input
          type="checkbox"
          value="dark"
          className="toggle theme-controller mr-4 sm:mr-6"
          checked={theme === "dark"}
          onChange={handleThemeChange}
          aria-label="Toggle dark mode"
        />

        <nav
          id="nav-menu"
          className="hidden peer-checked:flex flex-col w-full mt-4 space-y-2 md:flex md:flex-row md:space-y-0 md:space-x-4 md:mt-0 md:w-auto lg:space-x-6"
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block text-green-800 font-medium px-3 py-2 rounded transition-colors ${
                isActive
                  ? "border border-green-400 bg-green-200"
                  : "hover:text-green-700"
              }`
            }
            onClick={() =>
              (document.getElementById("menu-toggle").checked = false)
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/explore"
            className={({ isActive }) =>
              `block text-green-800 font-medium px-3 py-2 rounded transition-colors ${
                isActive
                  ? "border border-green-400 bg-green-200"
                  : "hover:text-green-700"
              }`
            }
            onClick={() =>
              (document.getElementById("menu-toggle").checked = false)
            }
          >
            Explore Gardeners
          </NavLink>
          <NavLink
            to="/tips"
            className={({ isActive }) =>
              `block text-green-800 font-medium px-3 py-2 rounded transition-colors ${
                isActive
                  ? "border border-green-400 bg-green-200"
                  : "hover:text-green-700"
              }`
            }
            onClick={() =>
              (document.getElementById("menu-toggle").checked = false)
            }
          >
            Browse Tips
          </NavLink>
          <NavLink
            to="/share"
            className={({ isActive }) =>
              `block text-green-800 font-medium px-3 py-2 rounded transition-colors ${
                isActive
                  ? "border border-green-400 bg-green-200"
                  : "hover:text-green-700"
              }`
            }
            onClick={() =>
              (document.getElementById("menu-toggle").checked = false)
            }
          >
            Share a Garden Tip
          </NavLink>
          <NavLink
            to="/myTips"
            className={({ isActive }) =>
              `block text-green-800 font-medium px-3 py-2 rounded transition-colors ${
                isActive
                  ? "border border-green-400 bg-green-200"
                  : "hover:text-green-700"
              }`
            }
            onClick={() =>
              (document.getElementById("menu-toggle").checked = false)
            }
          >
            My Tips
          </NavLink>
          {/* User Section */}
          {/* <Tooltip title="This is a tooltip!"> */}
     

          <div className="flex items-center gap-3 sm:gap-4">
            <div id="my-button"
              className="relative cursor-pointer"
              onClick={() => setShowLogout(!showLogout)}
              aria-label={`User profile: `}
            >
         
              <img data-tip="This is a tooltip!" 
                src={user ? user.photoURL : userIcon}
                alt="User profile"
                className="w-10 h-10 rounded-full object-cover"
              />
                  <Tooltip anchorId="my-button" content={`${user?.displayName}`} place="top" />
              {user && (
                <div
                  className={`${
                    showLogout ? "block" : "hidden"
                  } absolute top-12 left-0 text-black text-sm px-2 py-1 bg-green-200 rounded shadow-md z-10 md:hidden`}
                >
                  {user.displayName}
                </div>
              )}

              {user && (
                <div className="hidden md:block absolute top-12 left-0 text-black text-sm px-2 py-1 bg-green-200 rounded shadow-md opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-10">
                  {user.displayName}
                </div>
              )}
            </div>

            {/* Logout/Login Button */}
            {user ? (
              <button
                onClick={handleLogOut}
                className="px-4 btn py-2 text-sm text-green-800 font-medium border border-green-400 bg-green-200 rounded shadow-md hover:bg-green-300 transition-colors"
              >
                Log Out
              </button>
            ) : (
              <Link
                to="/auth/login"
                className="px-4 py-2 text-sm text-green-800 font-medium border border-green-400 bg-green-200 rounded shadow-md hover:bg-green-300 transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
