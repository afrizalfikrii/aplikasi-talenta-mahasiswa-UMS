import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { LogOut, LayoutDashboard } from "lucide-react";
import logoTalentaUMS from "@/assets/images/logo-talenta-ums.jpg";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { getMeApi } from "@/features/auth/api/auth.api";
import { ModeToggle } from "@/components/mode-toggle";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const userMenuRef = useRef<HTMLDivElement>(null);

  const { isAuthenticated, user, logout, setUser } = useAuthStore();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    setShowUserMenu(false);
    navigate("/");
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Check if link is active
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ${scrolled ? 'pt-4' : 'pt-0'}`}>
      <nav className={`
        flex items-center justify-between transition-all duration-500
        ${scrolled 
          ? 'w-[90%] max-w-5xl h-16 rounded-full glass-panel shadow-xl border border-white/20 dark:border-gray-700/20 px-6' 
          : 'w-full max-w-7xl h-20 bg-white dark:bg-gray-900 px-4 sm:px-6 md:px-8'}
      `}>
        {/* Logo with Image */}
        <Link 
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <img 
            src={logoTalentaUMS}
            alt="Talenta UMS Logo" 
            className="w-12 h-12 rounded-full object-cover shadow-lg group-hover:scale-110 transition-transform duration-300 ring-2 ring-blue-500/20"
          />
          <span className="font-bold text-lg tracking-tight text-gray-900 dark:text-white">
            Talenta<span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">UMS</span>
          </span>
        </Link>

        {/* Desktop Menu with Active Indicators */}
        <div className="hidden md:flex items-center gap-1">
          <Link 
            to="/" 
            className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group ${
              isActive('/') 
                ? 'text-blue-600 dark:text-blue-400' 
                : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
            }`}
          >
            Beranda
            {isActive('/') && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></span>
            )}
            {!isActive('/') && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full group-hover:w-1/2 transition-all duration-300"></span>
            )}
          </Link>
          
          <Link 
            to="/talenta" 
            className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group ${
              isActive('/talenta') 
                ? 'text-blue-600 dark:text-blue-400' 
                : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
            }`}
          >
            Eksplorasi
            {isActive('/talenta') && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></span>
            )}
            {!isActive('/talenta') && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full group-hover:w-1/2 transition-all duration-300"></span>
            )}
          </Link>
        </div>

        {/* Right Side Actions */}
        <div className="hidden md:flex items-center gap-3">
          <ModeToggle />
          
          {isAuthenticated ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 pl-2 hover:opacity-80 transition-opacity group"
              >
                <div className="relative w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm border-2 border-white dark:border-gray-800 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {user?.username.charAt(0).toUpperCase() || "U"}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity"></div>
                </div>
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 glass-panel rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 py-2 animate-fade-up">
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {user?.first_name} {user?.last_name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      @{user?.username}
                    </p>
                  </div>
                  
                  <Link
                    to={user?.role === "admin" ? "/admin/dashboard" : "/user/dashboard"}
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                  >
                    <LayoutDashboard size={18} />
                    Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/auth/login"
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300 font-semibold"
            >
              Masuk
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6 text-gray-700 dark:text-gray-300"
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
      </nav>

      {/* Mobile Menu Dropdown - Improved */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-2 right-2 glass-panel rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20 overflow-hidden animate-fade-up">
          {/* Menu Items */}
          <div className="p-3">
            <Link
              to="/"
              className={`block px-4 py-3 rounded-xl transition-all font-medium ${
                isActive('/') 
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Beranda
            </Link>
            <Link
              to="/talenta"
              className={`block px-4 py-3 rounded-xl transition-all font-medium mt-1 ${
                isActive('/talenta') 
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Eksplorasi
            </Link>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-200 dark:bg-gray-700 mx-3"></div>

          {isAuthenticated ? (
            <>
              {/* User Info */}
              <div className="p-3">
                <div className="flex items-center gap-3 px-3 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {user?.username.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {user?.first_name} {user?.last_name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {user?.role === "admin" ? "Administrator" : "Mahasiswa"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Dashboard Link */}
              <div className="px-3 pb-2">
                <Link
                  to={user?.role === "admin" ? "/admin/dashboard" : "/user/dashboard"}
                  className="flex items-center gap-2 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-200 dark:bg-gray-700 mx-3"></div>

              {/* Logout Button */}
              <div className="p-3">
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors font-medium"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="p-3">
              <Link
                to="/auth/login"
                className="block px-4 py-3 text-center text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl transition-all font-semibold shadow-lg shadow-blue-500/30"
                onClick={() => setIsMenuOpen(false)}
              >
                Masuk
              </Link>
            </div>
          )}

          {/* Dark Mode Toggle */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-3 flex justify-center">
            <ModeToggle />
          </div>
        </div>
      )}
    </div>
  );
}
