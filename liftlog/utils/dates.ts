export const currentUnixTS = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return Math.trunc(d.getTime() / 1000);
};
