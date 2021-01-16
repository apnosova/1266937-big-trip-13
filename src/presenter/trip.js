import SortView from "../view/sort.js";
import EventListView from "../view/event-list.js";
import NoEventView from "../view/no-event.js";

import EventPresenter from "./event.js";
import {render, RenderPosition} from "../utils/render.js";


export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;

    this._sortComponent = new SortView();
    this._eventListComponent = new EventListView();
    this._noEventComponent = new NoEventView();
  }

  // Метод для инициализации модуля
  init(tripEvents) {
    this._tripEvents = tripEvents.slice();

    // Метод инициализации вызывает метод для отрисовки таблицы со списком точек маршрута
    this._renderTrip();
  }

  // Метод для отрисовки сортировки
  _renderSort() {
    render(this._tripContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  // Логика по созданию компонента точки маршрута выделена в отдельный презентер
  _renderEvent(event) {
    const eventPresenter = new EventPresenter(this._eventListComponent);
    eventPresenter.init(event);
  }

  // Метод для отрисовки списка задач
  _renderEvents() {
    render(this._tripContainer, this._eventListComponent, RenderPosition.BEFOREEND);

    this._tripEvents.forEach((tripEvent) => this._renderEvent(tripEvent));
  }

  // Метод для отрисовки заглушки при отсутствии точек маршрута
  _renderNoEvents() {
    render(this._tripContainer, this._noEventComponent, RenderPosition.BEFOREEND);
  }

  // Метод для инициализации модуля
  // Метод для отрисовки таблицы со списком точек маршрута и сортировкой
  _renderTrip() {
    if (this._tripEvents.length === 0) {
      this._renderNoEvents();
      return;
    }

    this._renderSort();
    this._renderEvents();
  }
}
