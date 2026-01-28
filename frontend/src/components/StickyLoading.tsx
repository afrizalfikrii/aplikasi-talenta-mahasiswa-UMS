

type StickyLoadingProps = {
  show: boolean;
  text?: string;
};

export default function StickyLoading({
  show,
  text = "Memuat data...",
}: StickyLoadingProps) {
  if (!show) return null;

  return (
    <div className="sticky mt-5 z-50 w-full">
      <div className="flex items-center justify-center gap-3 bg-gradient-to-r from-sky-400 to-indigo-500 py-3 shadow-md">
        {/* Spinner */}
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-gray-200 border-t-transparent" />

        {/* Text */}
        <p className="text-sm font-medium text-white">
          {text}
        </p>
      </div>
    </div>
  );
}
