/**
 * @description The helpers functions of `logger` utility.
 * @author Andrii Lytovchenko <andr.lyt.dev@gmail.com>
 * @license MIT
 */

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
