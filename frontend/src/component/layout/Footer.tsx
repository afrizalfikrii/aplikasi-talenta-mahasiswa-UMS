import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-auto mx-4 md:mx-8 mb-4 rounded-3xl">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="hidden md:grid max-w-7xl mx-auto grid-cols-3 gap-8 mb-8 border-b border-gray-800 pb-8">
          <div>
            <h3 className="text-xl font-bold mb-2">MyTalenta</h3>
            <p className="text-gray-400 text-sm">
              Platform untuk menampilkan talenta dan portofolio mahasiswa Universitas Muhammadiyah Surakarta
            </p>
          </div>
          
          {/* link cepat */}
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/talenta" className="text-gray-400 hover:text-white transition-colors">
                  Browse Talenta
                </a>
              </li>
              <li>
                <a href="/login" className="text-gray-400 hover:text-white transition-colors">
                  Login
                </a>
              </li>
            </ul>
          </div>
          
          {/* info */}
          <div>
            <h4 className="font-semibold mb-3">Address</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Universitas Muhammadiyah Surakarta</li>
              <li>Jl. A. Yani Tromol Pos 1 Pabelan</li>
              <li>Surakarta, Jawa Tengah</li>
            </ul>
          </div>
        </div>
      {/* mobile */}
        <div className="text-center">
          <p className="text-sm text-gray-400">
            &copy; {currentYear} Talenta Mahasiswa UMS. All rights reserved.
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Universitas Muhammadiyah Surakarta
          </p>
        </div>

      </div>
    </footer>
  );
}