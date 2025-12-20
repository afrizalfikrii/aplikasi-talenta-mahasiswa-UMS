import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerApi, loginApi, getMeApi } from '../api/auth.api';
import { useAuthStore } from '../store/auth.store';
import type { RegisterPayload } from '../types/auth.types';

export default function Register() {
  const navigate = useNavigate();
  const doLogin = useAuthStore((s) => s.login);
  const setUser = useAuthStore((s) => s.setUser);
  const [formData, setFormData] = useState<RegisterPayload>({
    username: '',
    email: '',
    password: '',
    password2: '',
    nim: '',
    first_name: '',
    last_name: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage('');
    setIsLoading(true);

    try {
      await registerApi(formData);

      // Auto-login with registered credentials
      const loginRes = await loginApi({
        username: formData.username,
        password: formData.password,
      });
      doLogin(loginRes.access, loginRes.refresh);

      // Fetch user profile and store it
      const me = await getMeApi();
      setUser(me);

      // Go to home (or dashboard if needed)
      navigate('/');
    } catch (error: any) {
      if (error.response?.data) {
        // Backend validation errors
        setErrors(error.response.data);
      } else {
        setErrors({ general: 'Terjadi kesalahan. Silakan coba lagi.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center from-slate-50 to-slate-200 px-4 mt-16 mb-16">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className='justify-center mb-6 flex'>
            <img src="/logo-desktop.svg" alt="logo-talenta" className="h-10 w-auto" />
          </div>

          {successMessage && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              {successMessage}
            </div>
          )}

          {errors.general && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col">
                <label htmlFor="first_name" className="text-sm font-medium text-slate-700 mb-2 text-left">
                  Nama Depan
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="Setiawan"
                  required
                  className={`text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all ${errors.first_name ? 'border-red-500' : 'border-slate-300'
                    }`}
                />
                {errors.first_name && (
                  <span className="text-xs text-red-500 mt-1">{errors.first_name}</span>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="last_name" className="text-sm font-medium text-slate-700 mb-2 text-left">
                  Nama Belakang
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Ade"
                  required
                  className={`text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all ${errors.last_name ? 'border-red-500' : 'border-slate-300'
                    }`}
                />
                {errors.last_name && (
                  <span className="text-xs text-red-500 mt-1">{errors.last_name}</span>
                )}
              </div>
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
                  value={formData.nim}
                  onChange={handleChange}
                  placeholder="L2002300001"
                  required
                  className={`text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all ${errors.nim ? 'border-red-500' : 'border-slate-300'
                    }`}
                />
                {errors.nim && (
                  <span className="text-xs text-red-500 mt-1">{errors.nim}</span>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="username" className="text-sm font-medium text-slate-700 mb-2 text-left">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="adesetiawan"
                  required
                  className={`text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all ${errors.username ? 'border-red-500' : 'border-slate-300'
                    }`}
                />
                {errors.username && (
                  <span className="text-xs text-red-500 mt-1">{errors.username}</span>
                )}
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
                value={formData.email}
                onChange={handleChange}
                placeholder="adesetiawan@student.ums.ac.id"
                required
                className={`text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all ${errors.email ? 'border-red-500' : 'border-slate-300'
                  }`}
              />
              {errors.email && (
                <span className="text-xs text-red-500 mt-1">{errors.email}</span>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="text-sm font-medium text-slate-700 mb-2 text-left">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Masukkan password"
                required
                className={`text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all ${errors.password ? 'border-red-500' : 'border-slate-300'
                  }`}
              />
              {errors.password && (
                <span className="text-xs text-red-500 mt-1">{errors.password}</span>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="password2" className="text-sm font-medium text-slate-700 mb-2 text-left">
                Konfirmasi Password
              </label>
              <input
                type="password"
                id="password2"
                name="password2"
                value={formData.password2}
                onChange={handleChange}
                placeholder="Ulangi password"
                required
                className={`text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all ${errors.password2 ? 'border-red-500' : 'border-slate-300'
                  }`}
              />
              {errors.password2 && (
                <span className="text-xs text-red-500 mt-1">{errors.password2}</span>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-700 text-white py-2 rounded-lg hover:bg-slate-800 transition-colors font-semibold shadow-md hover:shadow-lg mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Mendaftar...' : 'Daftar'}
            </button>
          </form>

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