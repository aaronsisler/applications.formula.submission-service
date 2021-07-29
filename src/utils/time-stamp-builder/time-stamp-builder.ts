const timeStampBuilder = () => {
  const now = new Date(Date.now());
  return `${now.getFullYear()}-${now.getMonth()}-${now.getDay()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}:${now.getMilliseconds()}`;
};

export { timeStampBuilder };
