export const getStartDate = () => {
  // const today = new Date();
  // const startDate = `${today.getFullYear()}-${(
  //   '0' +
  //   (today.getMonth() + 1)
  // ).slice(-2)}-${('0' + today.getDate()).slice(-2)}T00:00:00`;
  // return startDate;
  const today = new Date();
  return today.setHours(0, 0, 0, 0);
};
export const getEndDate = () => {
  // const today = new Date();
  // const startDate = `${today.getFullYear()}-${(
  //   '0' +
  //   (today.getMonth() + 1)
  // ).slice(-2)}-${('0' + today.getDate()).slice(-2)}T23:59:59`;
  // return startDate;

  const today = new Date();
  return today.setHours(23, 59, 59, 59);
};
