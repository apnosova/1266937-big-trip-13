import {EVENT_TYPES, DESTINATION_CITIES} from "../constants.js";
import AbstractView from "./abstract.js";
import dayjs from "dayjs";

const BLANK_EVENT = {
  eventType: EVENT_TYPES[0],
  destinationCity: ``,
  start: dayjs().format(`DD/MM/YY HH:mm`),
  end: dayjs().format(`DD/MM/YY HH:mm`),
  price: ``,
  offers: ``,
  description: ``,
};

const createEventEditTemplate = (event) => {
  const {eventType, destinationCity, offers, time: {start, end}, price, description: {texts}} = event;

  const createEventTypeTemplate = EVENT_TYPES.map((type) =>
    `<div class="event__type-item">
      <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.toLowerCase()}">
      <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-1">${type}</label>
    </div>`).join(``);

  const createCityListTemplate = DESTINATION_CITIES.map((city) =>
    `<option value="${city}"></option>`).join(``);

  const createOffersSelectTemplate = offers.map((offer) =>
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.label}-1" type="checkbox" name="event-offer-${offer.label}" checked>
      <label class="event__offer-label" for="event-offer-${offer.label}-1">
        <span class="event__offer-title">${offer.description}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`).join(``);

  const createOffersContainerTemplate = (offers.length !== 0)
    ? `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${createOffersSelectTemplate}
       </div>
      </section>`
    : ``;

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${eventType}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
                ${createEventTypeTemplate}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${eventType}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationCity}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${createCityListTemplate}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dayjs(start).format(`DD/MM/YY HH:mm`)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dayjs(end).format(`DD/MM/YY HH:mm`)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        ${createOffersContainerTemplate}

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${texts}</p>
        </section>
      </section>
    </form>
  </li>`;
};

export default class EventEdit extends AbstractView {
  constructor(event = BLANK_EVENT) {
    super();
    this._event = event;
  }

  _getTemplate() {
    return createEventEditTemplate(this._event);
  }
}
