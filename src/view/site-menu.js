import AbstractView from "./abstract.js";
import {MenuItem} from "../constants.js";

const createSiteMenuTemplate = () => {
  return `<div class="trip-controls__wrapper">
    <h2 class="visually-hidden">Switch trip view</h2>
    <nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn trip-tabs__btn--active" href="#" data-menu-item="${MenuItem.TABLE}">Table</a>
      <a class="trip-tabs__btn" href="#" data-menu-item="${MenuItem.STATS}">Stats</a>
    </nav>
  </div>`;
};

export default class SiteMenu extends AbstractView {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createSiteMenuTemplate();
  }

  _menuClickHandler(evt) {
    if (!evt.target.dataset.menuItem) {
      return;
    }

    evt.preventDefault();
    this._callback.menuClick(evt.target.dataset.menuItem);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`click`, this._menuClickHandler);
  }

  setMenuItem(menuItem) {
    const items = this.getElement().querySelectorAll(`.trip-tabs__btn`);

    if (items !== null) {

      items.forEach((item) => {
        if (item.dataset.menuItem === menuItem) {
          item.classList.add(`trip-tabs__btn--active`);
        } else {
          item.classList.remove(`trip-tabs__btn--active`);
        }
      });
    }
  }

  restoreHandlers() {
    this.setMenuClickHandler(this._callback.menuClick);
  }
}
