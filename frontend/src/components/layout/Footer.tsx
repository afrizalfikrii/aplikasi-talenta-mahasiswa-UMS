import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full h-auto bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white mt-auto border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="hidden md:grid max-w-7xl mx-auto grid-cols-3 gap-12 mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                T
              </div>
              <span className="font-bold text-xl tracking-tight">
                Talenta<span className="text-blue-500">UMS</span>
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Platform untuk menampilkan talenta dan portofolio mahasiswa Universitas Muhammadiyah Surakarta
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 text-gray-900 dark:text-white">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/talenta" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Eksplorasi Talenta
                </Link>
              </li>
              <li>
                <Link to="/auth/login" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Login
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Address */}
          <div>
            <h4 className="font-bold mb-4 text-gray-900 dark:text-white">Address</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>Universitas Muhammadiyah Surakarta</li>
              <li>Jl. A. Yani Tromol Pos 1 Pabelan</li>
              <li>Surakarta, Jawa Tengah</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center max-w-7xl mx-auto">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {currentYear} Talenta Mahasiswa UMS. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Built with ❤️ by <span className="font-semibold text-blue-600 dark:text-blue-400">SolusiKode</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
