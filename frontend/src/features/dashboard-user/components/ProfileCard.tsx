import { useState } from "react";

export default function ProfileCard() {
    // dummy user
  const [profile] = useState({
    name: "Lutfi Halimawan",
    nim: "L200230001",
    email: "lutfihalimawan@student.ums.ac.id",
    phone: "081234567890",
    prodi: "Teknik Informatika",
    fakultas: "Fakultas Komunikasi dan Informatika",
    bio: "Seorang mahasiswa teknik informatika yang antusias mobile app...",
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold text-slate-800">Biodata</h2>
        <button className="flex items-center space-x-2 bg-slate-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-700 transition-colors">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
          <span>Edit Profil</span>
        </button>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-500">
              Nama Lengkap
            </label>
            <div className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900">
              {profile.name}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-500">NIM</label>
            <div className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900">
              {profile.nim}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-500">Email</label>
            <div className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900">
              {profile.email}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-500">
              No. Telepon
            </label>
            <div className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900">
              {profile.phone}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-500">
              Program Studi
            </label>
            <div className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900">
              {profile.prodi}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-500">
              Fakultas
            </label>
            <div className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900">
              {profile.fakultas}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-500">Bio</label>
          <div className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 h-24 overflow-y-auto">
            {profile.bio}
          </div>
        </div>
      </div>
    </div>
  );
}
