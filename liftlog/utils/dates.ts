export const currentUnixTS = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return parseInt(d.getTime() / 1000, 10);
};
