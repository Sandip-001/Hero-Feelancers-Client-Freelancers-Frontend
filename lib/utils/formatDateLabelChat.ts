export const formatDateLabel = (dateStr: string) => {
  const msgDate = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const isSameDay = (a: Date, b: Date) =>
    a.toDateString() === b.toDateString();

  if (isSameDay(msgDate, today)) return "Today";
  if (isSameDay(msgDate, yesterday)) return "Yesterday";

  const diffDays =
    (today.getTime() - msgDate.getTime()) / (1000 * 60 * 60 * 24);

  if (diffDays < 7) {
    return msgDate.toLocaleDateString(undefined, { weekday: "long" });
  }

  return msgDate.toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};
