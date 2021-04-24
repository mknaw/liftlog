export enum Month {
  January = 1,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December,
}

export enum WeekDay {
  Monday = 1,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

// TODO (?) tried using the enum but it was a PITA, not what I'd hoped
export const weekDayAsInt = [7, 1, 2, 3, 4, 5, 6];
export const weekDayAsString = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const currentUnixTS = (): number => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return Math.trunc(d.getTime() / 1000);
};

export const unixTSToDate = (ts: number): Date => (
  new Date(ts * 1000)
);

export const displayDate = (d: number | Date): string => {
  const date = typeof d === 'number' ? unixTSToDate(d) : d;
  return date.toLocaleDateString();
};
