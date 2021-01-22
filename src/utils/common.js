// Получение случайного целого числа в заданном интервале (включительно)
export const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// В массиве всех точек маршрута обновляет конкретную точку маршрута (массив, элемент)
export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index), // spread-оператор
    update,
    ...items.slice(index + 1)
  ];
};

export const capitalizeFirstLetter = (str) => {
  return str[0].toUpperCase() + str.slice(1);
};
