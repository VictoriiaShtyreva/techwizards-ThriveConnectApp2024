export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", options);
}

export function pluralizeCommentCount(count: number): string {
  return `${count} Comment${count !== 1 ? "s" : ""}`;
}
