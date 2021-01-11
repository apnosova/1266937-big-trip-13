import {createElement} from "../utils.js";

const createEventListTemplate = () => {
  return `<ul class="trip-events__list"></ul>`;
};

export default class EventList {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return createEventListTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this._getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
