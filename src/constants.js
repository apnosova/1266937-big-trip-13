import {getRandomIntInclusive} from "./utils/common.js";

export const EVENT_TYPES = [
  `Taxi`,
  `Bus`,
  `Train`,
  `Ship`,
  `Transport`,
  `Drive`,
  `Flight`,
  `Check-in`,
  `Sightseeing`,
  `Restaurant`,
];

export const DESTINATION_CITIES = [
  `Amsterdam`,
  `Chamonix`,
  `Geneva`,
  `Prague`,
  `Helsinki`,
  `St.Petersburg`,
  `Madrid`,
  `Valencia`,
];

export const OFFERS = [
  {
    label: `train`,
    type: `Taxi`,
    description: `Order Uber`,
    price: 20,
    isChecked: Boolean(getRandomIntInclusive(0, 1)),
  },
  {
    label: `car`,
    type: `Drive`,
    description: `Rent a car`,
    price: 200,
    isChecked: Boolean(getRandomIntInclusive(0, 1)),
  },
  {
    label: `luggage`,
    type: `Flight`,
    description: `Add luggage`,
    price: 30,
    isChecked: Boolean(getRandomIntInclusive(0, 1)),
  },
  {
    label: `comfort`,
    type: `Flight`,
    description: `Switch to comfort class`,
    price: 100,
    isChecked: Boolean(getRandomIntInclusive(0, 1)),
  },
  {
    label: `meal`,
    type: `Flight`,
    description: `Add meal`,
    price: 15,
    isChecked: Boolean(getRandomIntInclusive(0, 1)),
  },
  {
    label: `seats`,
    type: `Flight`,
    description: `Choose seats`,
    price: 5,
    isChecked: Boolean(getRandomIntInclusive(0, 1)),
  },
  {
    label: `train`,
    type: `Flight`,
    description: `Travel by train`,
    price: 40,
    isChecked: Boolean(getRandomIntInclusive(0, 1)),
  },
  {
    label: `breakfast`,
    type: `Check-in`,
    description: `Add breakfast`,
    price: 50,
    isChecked: Boolean(getRandomIntInclusive(0, 1)),
  },
  {
    label: `tickets`,
    type: `Sightseeing`,
    description: `Book tickets`,
    price: 40,
    isChecked: Boolean(getRandomIntInclusive(0, 1)),
  },
  {
    label: `lunch`,
    type: `Sightseeing`,
    description: `Lunch in city`,
    price: 30,
    isChecked: Boolean(getRandomIntInclusive(0, 1)),
  },
];

export const DESCRIPTION = {
  TEXTS: [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`,
  ],
  IMAGES: [],
};

export const Key = {
  ESC_KEY: `Escape` || `Esc`,
  ENTER_KEY: `Enter`,
};

export const SortType = {
  DAY: `day`,
  PRICE: `price`,
  TIME: `time`,
};
