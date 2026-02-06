export const formatMemberSince = (dateString?: string) => {
  if (!dateString) return "—";

  const date = new Date(dateString);

  return `Since ${date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })}`;
};