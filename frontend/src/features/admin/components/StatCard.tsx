export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  valueColor = "text-gray-900",
  iconBg = "bg-gray-100",
}: any) {
  return (
    <div className="bg-white rounded-2xl shadow-md border-2 border-gray-100 p-6 flex items-center gap-5">
      <div
        className={`w-14 h-14 rounded-xl flex items-center justify-center ${iconBg}`}
      >
        {icon}
      </div>

      <div className="text-left">
        <p className="text-sm text-gray-500">{title}</p>
        <p className={`text-xl font-semibold ${valueColor}`}>{value}</p>

        {subtitle && (
          <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
