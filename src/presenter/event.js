import EventView from "../view/event.js";
import EventEditView from "../view/event-edit.js";

import {render, RenderPosition, replace, remove} from "../utils/render.js";
import {Key} from "../constants.js";


export default class Event {
  constructor(eventListContainer, changeData) {
    this._eventListContainer = eventListContainer;
    this._changeData = changeData;

    this._eventComponent = null;
    this._eventEditComponent = null;

    this._handleUnrollBtnClick = this._handleUnrollBtnClick.bind(this);
    this._handleFavoriteBtnClick = this._handleFavoriteBtnClick.bind(this);
    this._handleRollupBtnClick = this._handleRollupBtnClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(event) {
    this._event = event;

    const prevEventComponent = this._eventComponent;
    const prevEventEditComponent = this._eventEditComponent;

    this._eventComponent = new EventView(event);
    this._eventEditComponent = new EventEditView(event);

    // Открытие формы редактирования по стрелке вниз
    this._eventComponent.setUnrollBtnClickHandler(this._handleUnrollBtnClick);

    // Кнопка добавления / удаления из Избранного
    this._eventComponent.setFavoriteBtnClickHandler(this._handleFavoriteBtnClick);

    // Закрытие формы редактирования по стрелке вверх
    this._eventEditComponent.setRollupBtnClickHandler(this._handleRollupBtnClick);

    // Закрытие формы редактирования по нажатию на кнопку Сохранить
    this._eventEditComponent.setFormSubmitHandler(this._handleFormSubmit);

    // Если компоненты не создавались, то отрисовываем
    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this._eventListContainer, this._eventComponent, RenderPosition.BEFOREEND);
      return;
    }

    // Если компоненты создавались (проверяем их наличие в DOM), то заменяем иx новыми и удаляем
    if (this._eventListContainer.getElement().contains(prevEventComponent.getElement())) {
      replace(this._eventComponent, prevEventComponent);
    }

    if (this._eventListContainer.getElement().contains(prevEventEditComponent.getElement())) {
      replace(this._eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  // Метод для удаления компонентов, для очистки списка точек маршрута при фильтрации и сортировке
  destroy() {
    remove(this._eventComponent);
    remove(this._eventEditComponent);
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

  _handleFavoriteBtnClick() {
    this._changeData(Object.assign({}, this._event, {isFavorite: !this._event.isFavorite}));
  }

  _handleFormSubmit(event) {
    this._changeData(event);
    this._replaceFormToPoint();
  }
}
