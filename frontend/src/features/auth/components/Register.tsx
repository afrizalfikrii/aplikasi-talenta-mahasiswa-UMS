import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, User, Mail, Lock, Eye, EyeOff, Hash, IdCard } from 'lucide-react';
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
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

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

      // Go to home
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 px-4 py-12 transition-colors">
      <div className="w-full max-w-2xl">
        {/* Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700 transition-all">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <UserPlus className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Daftar</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Buat akun baru Anda</p>
              </div>
            </div>
          </div>

          {/* General Error */}
          {errors.general && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-xl">
              <p className="text-sm text-red-700 dark:text-red-300 text-center">{errors.general}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nama Depan
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="Setiawan"
                    required
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all ${
                      errors.first_name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  />
                </div>
                {errors.first_name && (
                  <p className="text-xs text-red-500 dark:text-red-400 mt-1">{errors.first_name}</p>
                )}
              </div>

              <div>
                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nama Belakang
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Ade"
                    required
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all ${
                      errors.last_name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  />
                </div>
                {errors.last_name && (
                  <p className="text-xs text-red-500 dark:text-red-400 mt-1">{errors.last_name}</p>
                )}
              </div>
            </div>

            {/* NIM & Username */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="nim" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  NIM
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IdCard className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="nim"
                    name="nim"
                    value={formData.nim}
                    onChange={handleChange}
                    placeholder="L200230001"
                    required
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all ${
                      errors.nim ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  />
                </div>
                {errors.nim && (
                  <p className="text-xs text-red-500 dark:text-red-400 mt-1">{errors.nim}</p>
                )}
              </div>

              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Hash className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="adesetiawan"
                    required
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all ${
                      errors.username ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  />
                </div>
                {errors.username && (
                  <p className="text-xs text-red-500 dark:text-red-400 mt-1">{errors.username}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="adesetiawan@student.ums.ac.id"
                  required
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all ${
                    errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 dark:text-red-400 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Masukkan password"
                    required
                    className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all ${
                      errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500 dark:text-red-400 mt-1">{errors.password}</p>
                )}
              </div>

              <div>
                <label htmlFor="password2" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Konfirmasi Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword2 ? "text" : "password"}
                    id="password2"
                    name="password2"
                    value={formData.password2}
                    onChange={handleChange}
                    placeholder="Ulangi password"
                    required
                    className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all ${
                      errors.password2 ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword2(!showPassword2)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    {showPassword2 ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password2 && (
                  <p className="text-xs text-red-500 dark:text-red-400 mt-1">{errors.password2}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mt-6"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Mendaftar...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <UserPlus size={20} />
                  Daftar
                </span>
              )}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
            Sudah punya akun?{' '}
            <Link to="/auth/login" className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
              Masuk di sini
            </Link>
          </p>
        </div>

        {/* Footer Text */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          © 2024 Talenta UMS. All rights reserved.
        </p>
      </div>
    </div>
  );
}