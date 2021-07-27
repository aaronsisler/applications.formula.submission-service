/* eslint-disable no-console */
const timeElapsedLogger = (timeStart: number, message: string = ""): void => {
  const timeEnd = Date.now();

  console.info(
    `${message ? `${message}:` : "Time Elapsed:"}  ${timeEnd - timeStart}`
  );
};

export { timeElapsedLogger };
