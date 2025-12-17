import { Link } from "react-router-dom";
import CardHome from "../component/layout/CardHome";

export default function Home() {
  return (
    <>
      {/* hero */}
      <div className="text-slate-900 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {/* Temukan talenta terbaik Universitas Muhammadiyah Surakarta. <br />Jelajahi profil, skill,
            dan portofolio mahasiswa berbakat kami. */}
            Jelajahi Profil dan Portofolio talenta Universitas Muhammadiyah
            Surakarta
          </h1>

          {/* button */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            {/* jelajah */}
            <Link
              to="/talenta"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center justify-center bg-emerald-100 text-emerald-900 px-6 py-3 rounded-lg hover:bg-emerald-200 transition-colors font-bold"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              Jelajahi Talenta
            </Link>

            {/* daftar */}
            <Link
              to="/auth/register"
              className="inline-flex items-center justify-center bg-slate-600 text-white px-6 py-3 rounded-lg hover:bg-slate-700 transition-colors font-bold"
            >
              Daftar Sebagai Talenta
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* mini stats */}
      <div className="bg-slate-100 py-16 rounded-xl">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* total talenta */}
            <div>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4 text-emerald-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="text-4xl font-bold text-slate-800 mb-2">8+</h3>
              <p className="text-slate-600">Talenta Terdaftar</p>
            </div>

            {/* skill */}
            <div>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4 text-emerald-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <h3 className="text-4xl font-bold text-slate-800 mb-2">50+</h3>
              <p className="text-slate-600">Skill Tersedia</p>
            </div>

            {/* prodi */}
            <div>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4 text-emerald-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
              </div>
              <h3 className="text-4xl font-bold text-slate-800 mb-2">15+</h3>
              <p className="text-slate-600">Program Studi</p>
            </div>
          </div>
        </div>
      </div>

      {/* data talenta terbaru */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Talenta Terbaru
            </h2>
            <p className="text-gray-600">
              Kenali mahasiswa berbakat yang baru bergabung
            </p>
          </div>
          <div className="flex justify-center gap-6">
            {/* panggil layout card */}
            <CardHome />
          </div>

          {/* button direct ke smua talenta */}
          <div className="text-center mt-12">
            <Link
              to="/talenta"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center bg-slate-600 text-white px-8 py-3 rounded-lg hover:bg-slate-700 transition-colors font-semibold"
            >
              Lihat Semua Talenta
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
                className="ml-2"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
