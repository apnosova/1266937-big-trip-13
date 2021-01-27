import SortView from "../view/sort.js";
import EventListView from "../view/event-list.js";
import NoEventView from "../view/no-event.js";

import EventPresenter from "./event.js";
import {remove, render, RenderPosition} from "../utils/render.js";
import {sortEventByDay, sortEventByTime, sortEventByPrice} from "../utils/event.js";
import {filter} from "../utils/filter.js";
import {SortType, UserAction, UpdateType} from "../constants.js";


export default class Trip {
  constructor(tripContainer, eventsModel, filterModel) {
    this._eventsModel = eventsModel;
    this._filterModel = filterModel;
    this._tripContainer = tripContainer;
    // Заведем свойство _eventPresenter, где Trip-презентер будет хранить ссылки на все Event-презентеры, будем обращаться по id
    this._eventPresenter = new Map();
    this._eventListComponent = new EventListView();
    this._noEventComponent = new NoEventView();
    this._currentSortType = SortType.DAY; // Сортировка по умолчанию - по дате

    this._sortComponent = null;

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._eventsModel.addObserver(this._handleModelEvent); // Обработка уведомлений от модели
    this._filterModel.addObserver(this._handleModelEvent);
  }

  // Метод для инициализации модуля
  init() {
    // Метод инициализации вызывает метод для отрисовки таблицы со списком точек маршрута
    this._renderTrip();
  }

  // Получение данных из модели учитывает выбранную сортировку
  _getEvents() {
    const filterType = this._filterModel.getFilter();
    const events = this._eventsModel.getEvents();
    // const filtredEvents = filter[filterType](events);
    const filtredEvents = filter[filterType](events);

    switch (this._currentSortType) {
      case SortType.TIME:
        return filtredEvents.sort(sortEventByTime);
      case SortType.PRICE:
        return filtredEvents.sort(sortEventByPrice);
      default:
        return filtredEvents.sort(sortEventByDay);
    }
  }

  // Метод уведомления всех презентеров о смене режима
  _handleModeChange() {
    this._eventPresenter.forEach((presenter) => presenter.resetView());
  }

  // Обновление модели, исходя из действий пользователя
  // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать // нужен только для презентера
  // updateType - тип изменений, нужен чтобы понять, что после обновить
  // update - обновленные данные
  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this._eventsModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this._eventsModel.updateEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this._eventsModel.updateEvent(updateType, update);
        break;
    }
  }

  // callback обзервера, который будет вызывать модель
  // В этом методе обработать то, что модель изменилась
  // В зависимости от типа изменений решаем, что делать:
  _handleModelEvent(updateType, data) {
    switch (updateType) {
      // - обновить часть списка (например, когда поменялось описание)
      case UpdateType.PATCH:
        this._eventPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
      // - обновить список (переключение кнопки избранного)
        this._clearTrip();
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
      // - обновить всю таблицу (например, при переключении фильтра)
        this._clearTrip({resetSortType: true}); // получает объект настроек, сбрасывает выбранную сортировку
        this._renderTrip();
        break;
    }
  }

  // Сортируем задачи, очищаем список, рендерим список заново
  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearTrip();
    this._renderTrip();
  }

  // Метод для отрисовки сортировки
  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._tripContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _clearTrip({resetSortType = false} = {}) {
    this._eventPresenter.forEach((presenter) => presenter.destroy());
    // Удаляет все пары ключ - значение из объекта Map
    this._eventPresenter.clear();

    remove(this._sortComponent);
    remove(this._noEventComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DAY;
    }
  }

  // Логика по созданию компонента точки маршрута выделена в отдельный презентер
  _renderEvent(event) {
    const eventPresenter = new EventPresenter(this._eventListComponent, this._handleViewAction, this._handleModeChange);
    eventPresenter.init(event);
    // Записывает по ключу key = id значение value
    this._eventPresenter.set(event.id, eventPresenter);
  }

  // Метод для отрисовки списка задач
  _renderEventList(events) {
    render(this._tripContainer, this._eventListComponent, RenderPosition.BEFOREEND);

    events.forEach((event) => this._renderEvent(event));
  }

  // Метод для отрисовки заглушки при отсутствии точек маршрута
  _renderNoEvents() {
    render(this._tripContainer, this._noEventComponent, RenderPosition.BEFOREEND);
  }

  // Метод для инициализации модуля
  // Метод для отрисовки таблицы со списком точек маршрута и сортировкой
  _renderTrip() {
    const events = this._getEvents();

    if (events.length === 0) {
      this._renderNoEvents();
      return;
    }

    this._renderSort();
    this._renderEventList(events); // Список точек маршрута
  }
}
