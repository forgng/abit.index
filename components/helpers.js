const roundTo = (n, digits) => {
  if (digits === undefined) {
    digits = 0;
  }

  const multiplicator = Math.pow(10, digits);
  n = parseFloat((n * multiplicator).toFixed(11));
  const test = Math.round(n) / multiplicator;
  return +test.toFixed(digits);
};

const getReadableDate = timestamp => {
  const date = new Date(timestamp * 1000);
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = '0' + date.getMinutes();
  return `${day} ${month} ${year}, ${hours}:${minutes.substr(-2)} UTC`;
};

const convertToJsTimestamp = indices => {
  // const offset = new Date().getTimezoneOffset();
  const indicesConverted = indices.map(index => {
    const valuesConverted = index.values.map(value => [
      value.timestamp * 1000,
      value.value,
    ]);
    return { ...index, values: valuesConverted };
  });
  return indicesConverted;
};

export { roundTo, getReadableDate, convertToJsTimestamp };
