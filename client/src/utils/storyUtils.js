export const isStoryExpired = (postedTime) => {
  const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
  return Date.now() - postedTime > TWENTY_FOUR_HOURS;
};
