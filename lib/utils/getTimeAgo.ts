export const getTimeAgo = (dateStr: string) => {
  if (!dateStr) return "";

  // Backend format: "18-01-2026 07:50 pm"
  const [datePart, timePart, meridian] = dateStr.split(" ");
  const [day, month, year] = datePart.split("-").map(Number);
  let [hours, minutes] = timePart.split(":").map(Number);

  // Convert to 24h format
  if (meridian.toLowerCase() === "pm" && hours !== 12) hours += 12;
  if (meridian.toLowerCase() === "am" && hours === 12) hours = 0;

  const createdDate = new Date(year, month - 1, day, hours, minutes);
  const now = new Date();

  const diffMs = now.getTime() - createdDate.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffMonths = Math.floor(diffDays / 30);

  if (diffMinutes < 1) return "just now";
  if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  if (diffDays < 30) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  if (diffMonths < 12) return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;

  const years = Math.floor(diffMonths / 12);
  return `${years} year${years > 1 ? "s" : ""} ago`;
};
