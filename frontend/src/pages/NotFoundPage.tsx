import { Link } from "react-router-dom";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 px-4 transition-colors">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <h1 className="text-[150px] md:text-[200px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 leading-none">
            404
          </h1>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 dark:border-gray-700">
          <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Halaman Tidak Ditemukan
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
            Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin halaman telah dipindahkan atau URL yang Anda masukkan salah.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all hover:scale-105 shadow-lg shadow-blue-500/30"
            >
              <Home size={20} />
              Kembali ke Beranda
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
            >
              <ArrowLeft size={20} />
              Halaman Sebelumnya
            </button>
          </div>
        </div>

        {/* Footer Hint */}
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">
          Jika masalah berlanjut, silakan hubungi administrator
        </p>
      </div>
    </div>
  );
}