import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { getMeApi } from "@/features/auth/api/auth.api";
import { ModeToggle } from "@/components/mode-toggle";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { isAuthenticated, user, logout, setUser } = useAuthStore();

  useEffect(() => {
    const fetchUser = async () => {
      if (isAuthenticated && !user) {
        try {
          const userData = await getMeApi();
          setUser(userData);
        } catch (err) {
          console.error("Failed to fetch user data", err);
        }
      }
    };
    fetchUser();
  }, [isAuthenticated, user, setUser]);

  const handleLogout = () => {
    logout();
    navigate("/");
    console.log("Logout");
  };

  return (
    <nav className="w-full sticky top-4 z-50 mx-4 md:mx-8">
      <div className="bg-white shadow-lg rounded-2xl max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* logo desktop */}
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="hidden md:flex items-center space-x-3"
          >
            <img
              src="/logo-desktop.svg"
              alt="Talenta UMS"
              className="h-10 w-auto"
            />
          </Link>

          {/* logo mobile */}

          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex md:hidden items-center"
          >
            <img
              src={isMenuOpen ? "/logo-desktop.svg" : "/logo-mobile.svg"}
              className="h-8 w-auto transition-all duration-300"
            />
          </Link>

          {/* menu dekstop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-slate-700 transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              to="/talenta"
              className="text-gray-700 hover:text-slate-700 transition-colors font-medium"
            >
              Talenta
            </Link>


            {isAuthenticated ? (
              <>
                <Link
                  to={user?.role === "admin" ? "/admin/dashboard" : "/user/dashboard"}
                  className="flex items-center space-x-3 px-4 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {user?.username.charAt(0).toUpperCase() || "U"}
                  </div>
                  <span className="text-gray-700 font-medium">
                    {user?.username || "User"}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/auth/login"
                className="bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors font-medium"
              >
                Login
              </Link>
            )}

            {/* Toggle Mode */}
            <ModeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* hamburger menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link
              to="/"
              className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/talenta"
              className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Talenta
            </Link>

            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-3 px-4 py-2 bg-gray-50 rounded-lg mx-2">
                  <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {user?.username.charAt(0).toUpperCase() || "U"}
                  </div>
                  <span className="text-gray-700 font-medium">
                    {user?.username || "User"}
                  </span>
                </div>
                <Link
                  to={user?.role === "admin" ? "/admin/dashboard" : "/user/dashboard"}
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/auth/login"
                className="block px-4 py-2 text-white bg-slate-600 hover:bg-slate-700 rounded-lg transition-colors text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}

            {/* Mobile Toggle */}
            <div className="px-4 py-2 flex justify-center">
              <ModeToggle />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
