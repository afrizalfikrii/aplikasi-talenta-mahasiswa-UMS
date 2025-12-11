import { Link } from 'react-router-dom';

export default function Register() {
  return (
    <div className="flex items-center justify-center from-slate-50 to-slate-200 px-4 mt-16 mb-16">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">  
          <div className='justify-center mb-6 flex'>
            <img src="/logo-desktop.svg" alt="logo-talenta" className="h-10 w-auto"/>
          </div>
          <form className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="fullname" className="text-sm font-medium text-slate-700 mb-2 text-left">
                Nama Lengkap
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                placeholder="Setiawan Ade"
                required
                className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col">
                <label htmlFor="nim" className="text-sm font-medium text-slate-700 mb-2 text-left">
                  NIM
                </label>
                <input
                  type="text"
                  id="nim"
                  name="nim"
                  placeholder="L2002300001"
                  required
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="username" className="text-sm font-medium text-slate-700 mb-2 text-left">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="adesetiawan"
                  required
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-medium text-slate-700 mb-2 text-left">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="l200230000@student.ums.ac.id"
                required
                className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="text-sm font-medium text-slate-700 mb-2 text-left">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Masukkan password"
                required
                className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="confirm_password" className="text-sm font-medium text-slate-700 mb-2 text-left">
                Konfirmasi Password
              </label>
              <input
                type="password"
                id="confirm_password"
                name="confirm_password"
                placeholder="Ulangi password"
                required
                className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
              />
            </div>
            </form>
            <button type="submit" className="w-full bg-slate-700 text-white py-2 rounded-lg hover:bg-slate-800 transition-colors font-semibold shadow-md hover:shadow-lg mt-4">
              Daftar
            </button>
            <p className="text-center text-sm text-slate-600 mt-4">
              Sudah punya akun?{' '}
              <Link to="/auth/login" className="text-slate-800 font-medium hover:underline">
                Masuk di sini
              </Link>
            </p>
        </div>
      </div>
    </div>

  );
}
