import {EVENT_TYPES, DESTINATION_CITIES, OFFERS} from "../constants.js";
import {capitalizeFirstLetter} from "../utils/common.js";
import SmartView from "./smart.js";
import dayjs from "dayjs";

const BLANK_EVENT = {
  eventType: EVENT_TYPES[0],
  city: ``,
  start: dayjs().format(`DD/MM/YY HH:mm`),
  end: dayjs().format(`DD/MM/YY HH:mm`),
  price: ``,
  offers: ``,
  description: ``,
};

const createEventTypeListTemplate = (currentType, eventTypes) => {
  return eventTypes.map((type) => `<div class="event__type-item">
    <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type"
    value="${type.toLowerCase()}"
    ${currentType === type ? `checked` : ``}>
    <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-1">${type}</label>
  </div>`).join(``);
};

const createCityListTemplate = () => DESTINATION_CITIES.map((city) =>
  `<option value="${city}"></option>`).join(``);

const createCurrentOffers = (type) => {
  const currentOffers = OFFERS.filter((offer) => offer.type === type);

  return currentOffers;
};

const createOfferListTemplate = (eventType) => {

  const currentOffers = createCurrentOffers(eventType);

  return `${currentOffers.length !== 0 ? `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
      ${currentOffers.map((offer) => `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.label}-1" type="checkbox" name="event-offer-${offer.label}"
        ${offer.isChecked ? `checked` : ``}>
        <label class="event__offer-label" for="event-offer-${offer.label}-1">
          <span class="event__offer-title">${offer.description}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`).join(``)}
    </div>
  </section>` : ``}`;
};

const createDestinationTemplate = (texts, images) => {

  return `${texts.length !== 0 ? `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${texts}</p>

    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${images.map((image) => `<img class="event__photo" src="${image}" alt="Event photo">
        </img>`).join(``)}
      </div>
    </div>` : ``}`;
};

const createEventEditTemplate = (data) => {
  const {eventType, destination: {city}, destination: {description: {texts, images}}, time: {start, end}, price} = data;

  const eventTypeListTemplate = createEventTypeListTemplate(eventType, EVENT_TYPES);

  const cityListTemplate = createCityListTemplate();

  const offerListTemplate = createOfferListTemplate(eventType);

  const destinationTemplate = createDestinationTemplate(texts, images);

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${eventType.toLowerCase()}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
                ${eventTypeListTemplate}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${eventType}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination"
          value="${city}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${cityListTemplate}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time"
          value="${dayjs(start).format(`DD/MM/YY HH:mm`)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time"
          value="${dayjs(end).format(`DD/MM/YY HH:mm`)}">
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
        ${offerListTemplate}

        ${destinationTemplate}
      </section>
    </form>
  </li>`;
};

export default class EventEdit extends SmartView {
  constructor(event = BLANK_EVENT) {
    super();
    this._data = EventEdit.parseEventToData(event); // Описание задачи + внутреннее состояние для компонента

    this._rollupBtnClickHandler = this._rollupBtnClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._eventTypeChangeHandler = this._eventTypeChangeHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);
    this._priceInputHandler = this._priceInputHandler.bind(this);

    this._setInnerHandlers();
  }

  // Выход из редактирования без сохранения
  reset(event) {
    this.updateData(EventEdit.parseEventToData(event));
  }

  _getTemplate() {
    return createEventEditTemplate(this._data);
  }

  // Восстанавливает обработчики после обновления (внутренние и внешние), вызовем после обновления в UpdateElement()
  restoreHandlers() {
    this._setInnerHandlers();
    this.setRollupBtnClickHandler(this._callback.rollupBtnClick);
    this.setFormSubmitHandler(this._callback.formSubmit);
  }

  // Навешивает внутренние обработчики
  _setInnerHandlers() {
    this.getElement().querySelector(`.event__type-group`).addEventListener(`change`, this._eventTypeChangeHandler);
    this.getElement().querySelector(`.event__input--destination`).addEventListener(`change`, this._destinationChangeHandler);
    this.getElement().querySelector(`.event__input--price`).addEventListener(`input`, this._priceInputHandler);
  }

  _rollupBtnClickHandler(evt) {
    evt.preventDefault();
    this._callback.rollupBtnClick();
  }

  // Добавляем внутренние обработчики
  _eventTypeChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      eventType: capitalizeFirstLetter(evt.target.value),
    });
  }

  _destinationChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      city: evt.target.value,
    }, true);
  }

  _priceInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      price: evt.target.value
    }, true);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(EventEdit.parseDataToEvent(this._data));
  }

  setRollupBtnClickHandler(callback) {
    this._callback.rollupBtnClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._rollupBtnClickHandler);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }

  static parseEventToData(event) {
    return Object.assign({}, event, {

    });
  }

  static parseDataToEvent(data) {
    let event = Object.assign({}, data);


    // Удаляет флаги, нужные исключительно для логики представления
    // delete ;

    return event;
  }
}
