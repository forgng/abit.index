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

const convertToJsTimestamp = index => ({
  ...index,
  values: index.values.map(value => [value.timestamp * 1000, value.value]),
});

const timeFrameToSec = timeFrame => {
  switch (timeFrame) {
    case '5m':
      return 300;
    case '10m':
      return 600;
    case '15m':
      return 1800;
    case '30m':
      return 1800;
    case '60m':
      return 3600;
    default:
      return 1800;
  }
};

const timeSpanToTimeFrame = timeSpan => {
  switch (timeSpan) {
    case '1h':
      return '5m';
    case '24h':
      return '10m';
    case '7d':
      return '30m';
    default:
      return '30m';
  }
};
//     const { data } = await app.$axios.get(
//       `/api/abitindex/rest/v1/last?timeFrame=${timeFrame}&indices=${
//         process.env.INDICES
//       }`
//     );
export {
  roundTo,
  getReadableDate,
  convertToJsTimestamp,
  timeFrameToSec,
  timeSpanToTimeFrame,
};
