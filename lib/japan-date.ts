export function getJapanTodayDate() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());

  const year = parts.find((part) => part.type === 'year')?.value;
  const month = parts.find((part) => part.type === 'month')?.value;
  const day = parts.find((part) => part.type === 'day')?.value;

  return new Date(Number(year), Number(month) - 1, Number(day));
}

/** YYYY-MM-DD を 2026.8.2 sun 形式で表示（Asia/Tokyo） */
export function formatScheduleDate(date: string): string {
  const [year, month, day] = date.split('-').map(Number);
  const weekday = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    timeZone: 'Asia/Tokyo',
  })
    .format(new Date(year, month - 1, day))
    .toLowerCase();

  return `${year}.${month}.${day} ${weekday}`;
}
