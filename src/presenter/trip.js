import SortView from "../view/sort.js";
import EventListView from "../view/event-list.js";
import NoEventView from "../view/no-event.js";
import EventView from "../view/event.js";
import EventEditView from "../view/event-edit.js";

import {render, RenderPosition, replace} from "../utils/render.js";
import {Key} from "../constants.js";


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

  // Метод для создания и отрисовки задачи
  _renderEvent(event) {
    const eventComponent = new EventView(event);
    const eventEditComponent = new EventEditView(event);

    // Замена точки маршрута на форму редактирования и обратно
    const replacePointToForm = () => {
      replace(eventEditComponent, eventComponent);
    };

    const replaceFormToPoint = () => {
      replace(eventComponent, eventEditComponent);
    };

    // Обработчик нажатия клавиши Esc
    const escKeyDownHandler = (evt) => {
      if (evt.key === Key.ESC_KEY) {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener(`keydown`, escKeyDownHandler);
      }
    };

    // Открытие формы редактирования по стрелке вниз
    eventComponent.setUnrollBtnClickHandler(() => {
      replacePointToForm();
      document.addEventListener(`keydown`, escKeyDownHandler);
    });

    // Закрытие формы редактирования по стрелке вверх
    eventEditComponent.setRollupBtnClickHandler(() => {
      replaceFormToPoint();
      document.removeEventListener(`keydown`, escKeyDownHandler);
    });

    // Закрытие формы редактирования по нажатию на кнопку Сохранить
    eventEditComponent.setFormSubmitHandler(() => {
      replaceFormToPoint();
      document.removeEventListener(`keydown`, escKeyDownHandler);
    });

    render(this._eventListComponent, eventComponent, RenderPosition.BEFOREEND);
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
