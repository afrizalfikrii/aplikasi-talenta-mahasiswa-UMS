import { Link } from "react-router-dom";

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-slate-800 dark:text-slate-100">
          403
        </h1>
        <h2 className="text-3xl font-semibold text-slate-700 dark:text-slate-200 mt-4">
          Akses Ditolak
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mt-4 mb-8 max-w-md mx-auto">
          Maaf, Anda tidak memiliki izin untuk mengakses halaman ini. Silakan hubungi administrator jika Anda merasa ini adalah kesalahan.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center bg-slate-600 text-white px-6 py-3 rounded-lg hover:bg-slate-700 transition-colors font-semibold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Kembali ke Beranda
          </Link>
          <Link
            to="/auth/login"
            className="inline-flex items-center bg-emerald-100 text-emerald-900 px-6 py-3 rounded-lg hover:bg-emerald-200 transition-colors font-semibold"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
