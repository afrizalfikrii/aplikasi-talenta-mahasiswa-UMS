export const formatLevel = (level?: string) => {
  if (!level) return "";
  return level
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
};

export const formatDateRange = (
  startDate: string,
  endDate?: string | null
) => {
  const start = formatDate(startDate);
  if (!endDate) return `${start} - Sekarang`;
  return `${start} - ${formatDate(endDate)}`;
};

export const useCounterAnimation = (
  endValue: number,
  isVisible: boolean,
  onCountChange: (count: number) => void
) => {
  if (!isVisible) return;

  let currentCount = 0;
  const increment = Math.ceil(endValue / 100);
  const interval = setInterval(() => {
    currentCount += increment;
    if (currentCount >= endValue) {
      onCountChange(endValue);
      clearInterval(interval);
    } else {
      onCountChange(currentCount);
    }
  }, 50);

  return () => clearInterval(interval);
};
