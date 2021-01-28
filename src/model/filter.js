import Observer from "../utils/observer.js";
import {FilterType} from "../constants.js";

export default class Filter extends Observer {
  constructor() {
    super();

    this._activeFilter = FilterType.EVERYTHING;
  }

  setFilter(updateType, filter) {
    this._activeFilter = filter;
    this.notify(updateType, filter); // Вместе с уведомлением модель присылает активный фильтр
  }

  getFilter() {
    return this._activeFilter;
  }
}
