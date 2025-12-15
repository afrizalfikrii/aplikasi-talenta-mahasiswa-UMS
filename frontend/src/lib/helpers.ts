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
