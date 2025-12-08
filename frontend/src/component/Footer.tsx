export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-auto w-full rounded-t-lg">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
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
                <a href="/talents" className="text-gray-400 hover:text-white transition-colors">
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
          
          {/* info kontak */}
          <div>
            <h4 className="font-semibold mb-3">Address</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Universitas Muhammadiyah Surakarta</li>
              <li>Jl. A. Yani Tromol Pos 1 Pabelan</li>
              <li>Surakarta, Jawa Tengah</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy;{currentYear} Solusi Kode - MyTalenta.</p>
        </div>
      </div>
    </footer>
  );
}
