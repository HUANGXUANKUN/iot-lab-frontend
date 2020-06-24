const getLocalDateTimeString = (timestamp) => {
  const d = new Date(Number(timestamp));
  const localDateString = d.toLocaleDateString();
  const localTimeString = d.toLocaleTimeString();
  return localDateString + " " + localTimeString;
}

export {getLocalDateTimeString};