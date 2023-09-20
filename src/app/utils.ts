export const generateRandomColor = (): string => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  return `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`;
}

export const generateRandomFloat = (): string => {
  const minimum = 0;
  const maximum = 1000;
  const precision = 18;

  let float = Math.random() * (maximum - minimum) + minimum;

  return float.toFixed(precision);
}

export const getRandomInt = (): number => {
  return Math.floor(Math.random() * 1000);
}
