export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  valueColor = "text-gray-900",
  iconBg = "bg-gray-100",
}: any) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 flex items-center gap-5 transition-all hover:shadow-xl hover:scale-[1.02] duration-300">
      <div
        className={`w-14 h-14 rounded-xl flex items-center justify-center ${iconBg} dark:bg-opacity-20 shadow-md`}
      >
        {icon}
      </div>

      <div className="text-left">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        <p className={`text-2xl font-bold ${valueColor} dark:opacity-90`}>{value}</p>

        {subtitle && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
