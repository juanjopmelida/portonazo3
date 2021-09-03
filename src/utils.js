export const getTodayStartDate = () => {
  // const today = new Date();
  // const startDate = `${today.getFullYear()}-${(
  //   '0' +
  //   (today.getMonth() + 1)
  // ).slice(-2)}-${('0' + today.getDate()).slice(-2)}T00:00:00`;
  // return startDate;
  const today = new Date();
  return today.setHours(0, 0, 0, 0);
};
export const getTodayEndDate = () => {
  // const today = new Date();
  // const startDate = `${today.getFullYear()}-${(
  //   '0' +
  //   (today.getMonth() + 1)
  // ).slice(-2)}-${('0' + today.getDate()).slice(-2)}T23:59:59`;
  // return startDate;

  const today = new Date();
  return today.setHours(23, 59, 59, 59);
};

export const getYesterdayStartDate = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.setHours(0, 0, 0, 0);
};

export const getYesterdayEndDate = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.setHours(23, 59, 59, 59);
};
