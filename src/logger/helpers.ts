export function getTimeFormatted(): string {
  const [date, year, time] = new Date()
    .toLocaleString(undefined, {
      hour12: false,
      dateStyle: 'medium',
      timeStyle: 'medium',
    })
    .split(', ');

  return `${time} ${date} ${year}`;
}
