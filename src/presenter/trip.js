import SortView from "../view/sort.js";
import EventListView from "../view/event-list.js";
import NoEventView from "../view/no-event.js";

import EventPresenter from "./event.js";
import {updateItem} from "../utils/common.js";
import {render, RenderPosition} from "../utils/render.js";
import {sortEventByDay, sortEventByTime, sortEventByPrice} from "../utils/event.js";
import {SortType} from "../constants.js";


export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    // Заведем свойство _eventPresenter, где Trip-презентер будет хранить ссылки на все Event-презентеры, будем обращаться по id
    this._eventPresenter = new Map();
    this._sortComponent = new SortView();
    this._eventListComponent = new EventListView();
    this._noEventComponent = new NoEventView();
    this._currentSortType = SortType.DEFAULT; // Сортировка по умолчанию - по дате

    this._handleEventChange = this._handleEventChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  // Метод для инициализации модуля
  init(tripEvents) {
    this._tripEvents = tripEvents.slice();

    // Метод инициализации вызывает метод для отрисовки таблицы со списком точек маршрута
    this._renderTrip();
  }

  // Метод уведомления всех презентеров о смене режима
  _handleModeChange() {
    this._eventPresenter.forEach((presenter) => presenter.resetView());
  }

  // Метод изменения данных
  _handleEventChange(updatedEvent) {
    // Изменяет моки
    this._tripEvents = updateItem(this._tripEvents, updatedEvent);
    // Перерисовывает компонент точки маршрута
    this._eventPresenter.get(updatedEvent.id).init(updatedEvent);
  }

  _sortEvents(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this._tripEvents.sort(sortEventByTime);
        break;
      case SortType.PRICE:
        this._tripEvents.sort(sortEventByPrice);
        break;
      default:
        this._tripEvents.sort(sortEventByDay);
    }

    this._currentSortType = sortType;
  }

  // Сортируем задачи, очищаем список, рендерим список заново
  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortEvents(sortType);
    this._clearEventList();
    this._renderEventList();
  }

  // Метод для отрисовки сортировки
  _renderSort() {
    render(this._tripContainer, this._sortComponent, RenderPosition.BEFOREEND);

    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  // Логика по созданию компонента точки маршрута выделена в отдельный презентер
  _renderEvent(event) {
    const eventPresenter = new EventPresenter(this._eventListComponent, this._handleEventChange, this._handleModeChange);
    eventPresenter.init(event);
    // Записывает по ключу key = id значение value
    this._eventPresenter.set(event.id, eventPresenter);
  }

  // Метод для отрисовки списка задач
  _renderEventList() {
    render(this._tripContainer, this._eventListComponent, RenderPosition.BEFOREEND);

    this._tripEvents.forEach((tripEvent) => this._renderEvent(tripEvent));
  }

  // Метод для отрисовки заглушки при отсутствии точек маршрута
  _renderNoEvents() {
    render(this._tripContainer, this._noEventComponent, RenderPosition.BEFOREEND);
  }

  _clearEventList() {
    // Последовательный вызов destroy всех Event - презентеров
    this._eventPresenter.forEach((presenter) => presenter.destroy());
    // Удаляет все пары ключ - значение из объекта Map
    this._eventPresenter.clear();
  }

  // Метод для инициализации модуля
  // Метод для отрисовки таблицы со списком точек маршрута и сортировкой
  _renderTrip() {
    if (this._tripEvents.length === 0) {
      this._renderNoEvents();
      return;
    }

    this._renderSort();
    this._renderEventList();
  }
}
