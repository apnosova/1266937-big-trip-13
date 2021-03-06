import Abstract from "./abstract.js";

export default class Smart extends Abstract {
  constructor() {
    super();

    this._data = {};
  }

  updateData(update, justDataUpdating) {
    if (!update) {
      return;
    }

    this._data = Object.assign({}, this._data, update);

    // Для ввода цены
    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }

  updateElement() {
    let prevElement = this.getElement();
    const parent = prevElement.parentElement;

    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);

    this.restoreHandlers();
  }

  // Восстанавливает обработчики событий после перерисовки
  restoreHandlers() {
    throw new Error(`Abstract method not implemented: restoreHandlers`);
  }
}
