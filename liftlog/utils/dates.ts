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
