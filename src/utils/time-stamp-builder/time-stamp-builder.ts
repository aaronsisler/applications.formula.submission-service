const timeStampBuilder = () => {
  const EST_OFFSET_HOURS: number = 4;
  const timeOffsetInMS: number = EST_OFFSET_HOURS * 3600000;
  const nowUtc = new Date(Date.now());
  const now = new Date(nowUtc.getTime() - timeOffsetInMS);

  const month = `0${now.getMonth() + 1}`.slice(-2);
  const date = `0${now.getDate()}`.slice(-2);
  const hours = `0${now.getHours()}`.slice(-2);
  const minutes = `0${now.getMinutes()}`.slice(-2);
  const seconds = `0${now.getSeconds()}`.slice(-2);
  const timestamp = `${now.getFullYear()}-${month}-${date} ${hours}:${minutes}:${seconds}`;

  return timestamp;
};

export { timeStampBuilder };
