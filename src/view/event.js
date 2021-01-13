import dayjs from "dayjs";
import AbstractView from "./abstract.js";

const createEventTemplate = (event) => {
  const {eventType, destinationCity, time: {start, end, duration}, offers, price, isFavorite, isChecked} = event;

  const favoriteClassName = isFavorite
    ? `event__favorite-btn--active`
    : ``;

  const createOffersTemplate = offers.map((offer) => isChecked ? `<li class="event__offer">
    <span class="event__offer-title">${offer.description} </span>&plus;&euro;&nbsp; <span class="event__offer-price">${offer.price}</span>
  </li>` : ``).join(``);

  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="2019-03-18">${dayjs(start).format(`MMM DD`)}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${eventType.toLowerCase()}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${eventType} ${destinationCity}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dayjs(start).format(`YYYY-MM-DDTHH:mm`)}">${dayjs(start).format(`HH:mm`)}</time>
          &mdash;
          <time class="event__end-time" datetime="${dayjs(end).format(`YYYY-MM-DDTHH:mm`)}">${dayjs(end).format(`HH:mm`)}</time>
        </p>
        <p class="event__duration">${duration}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${createOffersTemplate}
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
  }

  _getTemplate() {
    return createEventTemplate(this._event);
  }
}
