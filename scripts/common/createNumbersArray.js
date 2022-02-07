export const createNumbersArray = (from, to) => {
  let result = [];
  for (let i = from; i <= to; i += 1) {
    result.push(i)
  }
  return result;
};

