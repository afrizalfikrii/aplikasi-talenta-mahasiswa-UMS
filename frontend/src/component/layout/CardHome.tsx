// data dummy
export default function CardHome() {
  return (
    <div className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow duration-300 text-center border border-slate-200">
      <div className="w-20 h-20 mx-auto mb-3 bg-slate-100 rounded-full flex items-center justify-center">
        <span className="text-2xl font-bold text-slate-600">A</span>
      </div>
      <h3 className="text-sm font-bold text-gray-900 mb-1">Ahmad Fauzi</h3>
      <p className="text-xs text-gray-500 mb-3">Teknik Informatika</p>
      <div className="flex flex-wrap justify-center gap-1 mb-3">
        <span className="px-2 py-0.5 bg-white border border-slate-200 text-slate-600 text-xs font-medium rounded">
          React
        </span>
        <span className="px-2 py-0.5 bg-white border border-slate-200 text-slate-600 text-xs font-medium rounded">
          Node.js
        </span>
      </div>
    </div>
  );
}