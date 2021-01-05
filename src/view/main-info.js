import {createElement} from "../utils";

const createMainInfoTemplate = () => {
  return `<div class="trip-info__main">
      <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>
      <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
    </div>`;
};

export default class MainInfo {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return createMainInfoTemplate();
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
