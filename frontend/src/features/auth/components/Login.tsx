import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { loginApi } from '../api/auth.api';
import { useAuthStore } from '../store/auth.store';

export default function Login() {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await loginApi({ email, password })
      login(res.access, res.refresh)
      navigate("/") // redirect setelah login
    } catch (err) {
      alert("Login gagal")
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="flex items-center justify-center from-slate-50 to-slate-200 px-4 mt-16 mb-16">

      <div className="w-full max-w-md">

        {/* card login */}
        <div className="bg-white rounded-lg shadow-lg p-8">  
          <div className='justify-center mb-6 flex'>
            <img src="/logo-desktop.svg" alt="logo-talenta" className="h-10 w-auto"/>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
              />
            </div>
            {/* button remember */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-slate-600 border-slate-300 rounded focus:ring-slate-500"
                />
                <span className="ml-2 text-sm text-slate-600">Ingat saya</span>
              </label>
              <a href="#" className="text-sm text-slate-600 hover:text-slate-800 transition-colors">
                Lupa password?
              </a>
            </div>

            {/* submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-700 text-white py-3 rounded-lg hover:bg-slate-800 transition-colors font-semibold shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sedang masuk..." : "Masuk"}
            </button>

            {/* divide  */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">atau</span>
              </div>
            </div>
            {/* direct register */}
            <p className="text-center text-sm text-slate-600">
              Belum punya akun?{' '}
              <Link to="/auth/register" className="font-semibold text-slate-700 hover:text-slate-900 transition-colors">
                Daftar sekarang
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
