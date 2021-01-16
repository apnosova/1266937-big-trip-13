import EventView from "../view/event.js";
import EventEditView from "../view/event-edit.js";

import {render, RenderPosition, replace} from "../utils/render.js";
import {Key} from "../constants.js";


export default class Event {
  constructor(eventListContainer) {
    this._eventListContainer = eventListContainer;

    this._eventComponent = null;
    this._eventEditComponent = null;

    this._handleUnrollBtnClick = this._handleUnrollBtnClick.bind(this);
    this._handleRollupBtnClick = this._handleRollupBtnClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(event) {
    this._event = event;

    this._eventComponent = new EventView(event);
    this._eventEditComponent = new EventEditView(event);

    // Открытие формы редактирования по стрелке вниз
    this._eventComponent.setUnrollBtnClickHandler(this._handleUnrollBtnClick);

    // Закрытие формы редактирования по стрелке вверх
    this._eventEditComponent.setRollupBtnClickHandler(this._handleRollupBtnClick);

    // Закрытие формы редактирования по нажатию на кнопку Сохранить
    this._eventEditComponent.setFormSubmitHandler(this._handleFormSubmit);

    render(this._eventListContainer, this._eventComponent, RenderPosition.BEFOREEND);
  }

  // Замена точки маршрута на форму редактирования и обратно
  _replacePointToForm() {
    replace(this._eventEditComponent, this._eventComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _replaceFormToPoint() {
    replace(this._eventComponent, this._eventEditComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  // Обработчик нажатия клавиши Esc
  _escKeyDownHandler(evt) {
    if (evt.key === Key.ESC_KEY) {
      evt.preventDefault();
      this._replaceFormToPoint();
    }
  }

  _handleUnrollBtnClick() {
    this._replacePointToForm();
  }

  _handleRollupBtnClick() {
    this._replaceFormToPoint();
  }

  _handleFormSubmit() {
    this._replaceFormToPoint();
  }
}
