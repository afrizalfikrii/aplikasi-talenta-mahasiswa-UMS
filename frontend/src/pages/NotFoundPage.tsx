import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-600 mt-4">Halaman tidak ditemukan</p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
};

export default NotFoundPage;