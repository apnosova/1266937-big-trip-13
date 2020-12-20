// Точка маршрута

import dayjs from "dayjs";
import {getRandomIntInclusive} from "../utils.js";
import {EVENT_TYPES, DESTINATIONS, OFFERS, DESCRIPTION} from "../constants.js";

// Время и продолжительность нахождения в точке маршрута
const generateTime = () => {
  const maxDaysGap = 7;
  const maxHoursGap = 23;
  const maxMinutesGap = 59;
  const maxDurationInDays = 2;

  const daysGap = getRandomIntInclusive(-maxDaysGap, maxDaysGap);
  const hoursGap = getRandomIntInclusive(0, maxHoursGap);
  const minutesGap = getRandomIntInclusive(0, maxMinutesGap);
  const durationGap = getRandomIntInclusive(0, maxDurationInDays);

  const start = dayjs().add(daysGap, `day`).add(hoursGap, `hour`).add(minutesGap, `minute`);
  const end = start.add(durationGap, `day`).add(hoursGap, `hour`).add(minutesGap, `minute`);

  const durationInDays = end.diff(start, `day`, true); // без округления

  const HOURS_IN_DAY = 24;
  const MINS_IN_HOUR = 60;


  const days = Math.trunc(durationInDays);
  const durationInHours = (durationInDays - days) * HOURS_IN_DAY;
  const hours = Math.trunc(durationInHours);
  const minutes = Math.trunc((durationInHours - hours) * MINS_IN_HOUR);

  let duration;

  if (!days && !hours) {
    duration = minutes.toString().padStart(2, 0) + `M`;
  } else if (hours && !days) {
    duration = hours.toString().padStart(2, 0) + `H ` + minutes.toString().padStart(2, 0) + `M`;
  } else if (days) {
    duration = days.toString().padStart(2, 0) + `D ` + hours.toString().padStart(2, 0) + `H ` + minutes.toString().padStart(2, 0) + `M`;
  }

  const time = {
    start,
    end,
    duration,
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
  // const randomIndex = getRandomIntInclusive(0, offers.length - 1);

  // return offers.slice(0, randomIndex);
  return offers;
};

// Пункт назначения (город)
const generateDestination = () => {
  const randomIndex = getRandomIntInclusive(0, DESTINATIONS.length - 1);

  return DESTINATIONS[randomIndex];
};

const generateDescription = () => {

  const generateText = () => {
    return DESCRIPTION.TEXTS[getRandomIntInclusive(0, DESCRIPTION.TEXTS.length)];
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
    destination: generateDestination(),
    time: generateTime(),
    offers: generateOffers(eventType),
    description: generateDescription(),
    isFavorite: Boolean(getRandomIntInclusive(0, 1)),
    price: generatePrice(),
  };
};
