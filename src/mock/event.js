// Точка маршрута

import dayjs from "dayjs";
import {getRandomIntInclusive} from "../utils.js";
import {EVENT_TYPES, DESTINATION_CITIES, OFFERS, DESCRIPTION} from "../constants.js";

// Время и продолжительность нахождения в точке маршрута
const generateTime = () => {
  const generateStart = () => {
    const maxGapInMins = 10080;
    const gapInMins = getRandomIntInclusive(-maxGapInMins, maxGapInMins);
    const start = dayjs().add(gapInMins, `minute`);

    return start;
  };

  const start = generateStart();

  const generateEnd = () => {
    const maxDurationInMins = 4320;
    const durationGap = getRandomIntInclusive(0, maxDurationInMins);
    const end = start.add(durationGap, `minute`);

    return end;
  };

  const end = generateEnd();

  const generateDuration = () => {
    const HOURS_IN_DAY = 24;
    const MINS_IN_HOUR = 60;

    const durationInDays = end.diff(start, `day`, true); // без округления
    const days = Math.trunc(durationInDays);
    const durationInHours = (durationInDays - days) * HOURS_IN_DAY;
    const hours = Math.trunc(durationInHours);
    const minutes = Math.trunc((durationInHours - hours) * MINS_IN_HOUR);

    let duration;

    if (!days && !hours) {
      duration = minutes.toString().padStart(2, 0) + `M`;
    } else if (hours && !days) {
      duration = hours.toString().padStart(2, 0) + `H ` + minutes.toString().padStart(2, 0) + `M`;
    } else {
      duration = days.toString().padStart(2, 0) + `D ` + hours.toString().padStart(2, 0) + `H ` + minutes.toString().padStart(2, 0) + `M`;
    }

    return duration;
  };

  const time = {
    start,
    end,
    duration: generateDuration(),
  };

  return time;
};

// Тип точки маршрута
const generateEventType = () => {
  const randomIndex = getRandomIntInclusive(0, EVENT_TYPES.length - 1);

  return EVENT_TYPES[randomIndex];
};

// Дополнительные опции
const generateOffers = (type) => {
  const offers = OFFERS.filter((offer) => offer.type === type);

  return offers;
};

// Пункт назначения (город)
const generateDestinationCity = () => {
  const randomIndex = getRandomIntInclusive(0, DESTINATION_CITIES.length - 1);

  return DESTINATION_CITIES[randomIndex];
};

// Информация о месте назначения
const generateDescription = () => {
  const generateText = () => {
    return DESCRIPTION.TEXTS[getRandomIntInclusive(0, DESCRIPTION.TEXTS.length - 1)];
  };
  const texts = new Array(getRandomIntInclusive(1, 5)).fill().map(generateText).join(` `);

  const generateImage = () => {
    return `http://picsum.photos/248/152?r=` + getRandomIntInclusive(1, 10000);
  };
  const images = new Array(getRandomIntInclusive(1, 5)).fill().map(generateImage);

  const description = {
    texts,
    images,
  };

  return description;
};

const generatePrice = () => {
  const price = getRandomIntInclusive(20, 1000);

  return price;
};

export const generateEvent = () => {
  const eventType = generateEventType();

  return {
    eventType,
    destinationCity: generateDestinationCity(),
    time: generateTime(),
    offers: generateOffers(eventType),
    description: generateDescription(),
    isFavorite: Boolean(getRandomIntInclusive(0, 1)),
    price: generatePrice(),
    isChecked: Boolean(getRandomIntInclusive(0, 1)),
  };
};
