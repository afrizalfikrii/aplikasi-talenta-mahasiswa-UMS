import { Search } from "lucide-react";

export default function SearchFilterBar() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col md:flex-row gap-4 items-center">
      
      {/* Search Input */}
      <div className="relative flex-1 w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Cari berdasarkan nama, NIM, atau program studi..."
          className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2">
        <button className="px-4 py-2.5 text-sm rounded-lg bg-red-600 text-white font-medium">
          Semua
        </button>

        <button className="px-4 py-2.5 text-sm rounded-lg bg-gray-100 text-gray-700 font-medium">
          Aktif
        </button>

        <button className="px-4 py-2.5 text-sm rounded-lg bg-gray-100 text-gray-700 font-medium">
          Nonaktif
        </button>
      </div>
    </div>
  );
}
