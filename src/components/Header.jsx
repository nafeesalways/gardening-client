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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load theme on mount
  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Logout
  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully");
        setIsMobileMenuOpen(false);
      })
      .catch(() => toast.error("An error occurred"));
  };

  // Close mobile menu when clicking a link
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Navigation Links Component
  const navLinkClass = ({ isActive }) =>
    `relative px-3 py-2 rounded-md font-medium text-sm transition-all duration-200 block ${
      isActive
        ? "text-green-600 bg-green-50 dark:bg-green-900/20"
        : "text-gray-700 dark:text-gray-200 hover:text-green-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-green-400"
    }`;

  const Links = (
    <>
      <NavLink to="/" className={navLinkClass} onClick={closeMobileMenu}>
        Home
      </NavLink>
      <NavLink to="/explore" className={navLinkClass} onClick={closeMobileMenu}>
        Explore Gardeners
      </NavLink>
      <NavLink to="/tips" className={navLinkClass} onClick={closeMobileMenu}>
        Browse Tips
      </NavLink>

      {user && (
        <>
          <NavLink
            to="/share"
            className={navLinkClass}
            onClick={closeMobileMenu}
          >
            Share Tip
          </NavLink>
          <NavLink
            to="/myTips"
            className={navLinkClass}
            onClick={closeMobileMenu}
          >
            My Tips
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-md"
          : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
      } border-b border-gray-200 dark:border-gray-800`}
    >
      <nav className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 max-w-7xl mx-auto">
          {/* Left Section: Mobile Menu + Logo */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden btn btn-ghost btn-sm btn-circle hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <svg
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>

            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-1.5 sm:gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-7 h-7 sm:w-9 sm:h-9 lg:w-10 lg:h-10 flex items-center justify-center bg-green-50 dark:bg-green-900/20 rounded-lg">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/8757/8757837.png"
                  alt="GardenHub"
                  className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
                />
              </div>
              <span className="font-bold text-green-600 dark:text-green-500 text-base sm:text-lg lg:text-xl tracking-tight">
                GardenHub
              </span>
            </Link>
          </div>

          {/* Center Section: Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">{Links}</div>

          {/* Right Section: Theme Toggle + Auth */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="btn btn-ghost btn-sm btn-circle hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* Auth Section */}
            {user ? (
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar ring-2 ring-green-500 ring-offset-2 ring-offset-base-100"
                >
                  <div className="w-8 sm:w-9 rounded-full">
                    <img
                      src={user.photoURL || userIcon}
                      alt={user.displayName || "User"}
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content mt-3 p-3 shadow-lg bg-base-100 rounded-xl w-52 sm:w-56 border border-base-300"
                >
                  <li className="px-3 py-2 mb-2 border-b border-base-300">
                    <div className="flex flex-col pointer-events-none">
                      <span className="font-semibold text-sm truncate">
                        {user.displayName}
                      </span>
                      <span className="text-xs text-gray-500 truncate">
                        {user.email}
                      </span>
                    </div>
                  </li>
                  <li>
                    <button
                      onClick={handleLogOut}
                      className="btn btn-sm bg-red-500 text-white hover:bg-red-600 border-none w-full justify-start"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Log Out
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/auth/login"
                  className="btn btn-sm btn-ghost text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 min-w-[70px]"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth/register"
                  className="btn btn-sm bg-green-600 hover:bg-green-700 text-white border-none min-w-[80px]"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col py-3 space-y-1 border-t border-base-300">
            {Links}

            {/* Mobile Auth Buttons */}
            <div className="pt-3 mt-3 border-t border-base-300 space-y-2 px-3">
              {user ? (
                <button
                  onClick={handleLogOut}
                  className="btn btn-sm w-full bg-red-500 text-white hover:bg-red-600 border-none"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Log Out
                </button>
              ) : (
                <div className="flex gap-2">
                  <Link
                    to="/auth/login"
                    onClick={closeMobileMenu}
                    className="btn btn-sm flex-1 btn-outline btn-success"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/auth/register"
                    onClick={closeMobileMenu}
                    className="btn btn-sm flex-1 bg-green-600 hover:bg-green-700 text-white border-none"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
