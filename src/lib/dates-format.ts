const formatDate = (dateTimeString: Date): string => {
  const date = new Date(dateTimeString);
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "Asia/Jakarta",
  });
};

const formatTime = (dateTimeString: Date): string => {
  const date = new Date(dateTimeString);
  return date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
  });
};

export { formatDate, formatTime };
