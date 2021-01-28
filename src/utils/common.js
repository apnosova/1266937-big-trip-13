// Получение случайного целого числа в заданном интервале (включительно)
export const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const capitalizeFirstLetter = (str) => {
  return str[0].toUpperCase() + str.slice(1);
};
