// Точка маршрута

import dayjs from "dayjs";
import {getRandomIntInclusive} from "../utils/common.js";
import {EVENT_TYPES, DESTINATION_CITIES, DESCRIPTION} from "../constants.js";

import {nanoid} from 'nanoid';

// Время и продолжительность нахождения в точке маршрута
const generateStart = () => {
  const maxGapInMins = 10080;
  const gapInMins = getRandomIntInclusive(-maxGapInMins, maxGapInMins);
  const start = dayjs().add(gapInMins, `minute`);

  return start;
};

const generateEnd = (startTime) => {
  const maxDurationInMins = 4320;
  const durationGap = getRandomIntInclusive(0, maxDurationInMins);
  const end = startTime.add(durationGap, `minute`);

  return end;
};


// Тип точки маршрута
const generateEventType = () => {
  const randomIndex = getRandomIntInclusive(0, EVENT_TYPES.length - 1);

  return EVENT_TYPES[randomIndex];
};

// Дополнительные опции
// const generateOffers = (type) => {
// const offers = OFFERS.filter((offer) => offer.type === type);

// return offers;
// };

// Пункт назначения (город)
const generateDestinationCity = () => {
  const randomIndex = getRandomIntInclusive(0, DESTINATION_CITIES.length - 1);

  return DESTINATION_CITIES[randomIndex];
};

// Информация о месте назначения
const generateText = () => {
  const generateRandomText = () => {

    return DESCRIPTION.TEXTS[getRandomIntInclusive(0, DESCRIPTION.TEXTS.length - 1)];
  };

  const text = new Array(getRandomIntInclusive(1, 5)).fill().map(generateRandomText).join(` `);

  return text;
};

const generateImages = () => {
  const generateRandomImage = () => {
    return `http://picsum.photos/248/152?r=` + getRandomIntInclusive(1, 10000);
  };

  const images = new Array(getRandomIntInclusive(1, 5)).fill().map(generateRandomImage);

  return images;
};

const generatePrice = () => {
  const price = getRandomIntInclusive(20, 1000);

  return price;
};

export const generateEvent = () => {
  const eventType = generateEventType();
  const startTime = generateStart();

  return {
    id: nanoid(),
    eventType,
    startTime,
    endTime: generateEnd(startTime),
    city: generateDestinationCity(),
    text: generateText(),
    images: generateImages(),
    isFavorite: Boolean(getRandomIntInclusive(0, 1)),
    price: generatePrice(),
  };
};
