import {formatEventDay, formatEventTime, formatMachineDate, generateDuration} from "../utils/event.js";
import {OFFERS} from "../constants.js";
import AbstractView from "./abstract.js";
import dayjs from "dayjs";

const createEventTemplate = (event) => {
  const {eventType, city, startTime, endTime, price, isFavorite} = event;

  const favoriteClassName = isFavorite
    ? `event__favorite-btn--active`
    : ``;

  const createCurrentOffers = (type) => {
    const currentOffers = OFFERS.filter((offer) => offer.type === type);

    return currentOffers;
  };

  const currentOffers = createCurrentOffers(eventType);

  const createOfferListTemplate = currentOffers.map((offer) => offer.isChecked ? `<li class="event__offer">
    <span class="event__offer-title">${offer.description} </span>&plus;&euro;&nbsp; <span class="event__offer-price">${offer.price}</span>
  </li>` : ``).join(``);

  const duration = generateDuration(startTime, endTime);

  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${dayjs(startTime).format(`YYYY-MM-DD`)}">${formatEventDay(startTime)}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${eventType.toLowerCase()}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${eventType} ${city}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${formatMachineDate(startTime)}">${formatEventTime(startTime)}</time>
          &mdash;
          <time class="event__end-time" datetime="${formatMachineDate(endTime)}">${formatEventTime(endTime)}</time>
        </p>
        <p class="event__duration">${duration}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${createOfferListTemplate}
      </ul>
      <button class="event__favorite-btn ${favoriteClassName}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};

export default class Event extends AbstractView {
  constructor(event) {
    super();
    this._event = event;

    this._unrollBtnClickHandler = this._unrollBtnClickHandler.bind(this);
    this._favoriteBtnClickHandler = this._favoriteBtnClickHandler.bind(this);
  }

  _getTemplate() {
    return createEventTemplate(this._event);
  }

  _unrollBtnClickHandler(evt) {
    evt.preventDefault();
    this._callback.unrollBtnClick();
  }

  _favoriteBtnClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteBtnClick();
  }

  setUnrollBtnClickHandler(callback) {
    this._callback.unrollBtnClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._unrollBtnClickHandler);
  }

  setFavoriteBtnClickHandler(callback) {
    this._callback.favoriteBtnClick = callback;
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, this._favoriteBtnClickHandler);
  }
}
