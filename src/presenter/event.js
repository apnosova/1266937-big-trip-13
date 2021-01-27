import EventView from "../view/event.js";
import EventEditView from "../view/event-edit.js";

import {render, RenderPosition, replace, remove} from "../utils/render.js";
import {Key, UserAction, UpdateType} from "../constants.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`,
};


export default class Event {
  constructor(eventListContainer, changeData, changeMode) {
    this._eventListContainer = eventListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._eventComponent = null;
    this._eventEditComponent = null;
    this._mode = Mode.DEFAULT;

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

    // Проверка режима для замены компонентов при повторной инициализации
    if (this._mode === Mode.DEFAULT) {
      replace(this._eventComponent, prevEventComponent);
    }

    if (this._mode === Mode.EDITING) {
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

  // Метод для смены режима на режим по умолчанию, режим изменяется, если задача была открыта для редактирования
  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToPoint();
    }
  }

  // Замена точки маршрута на форму редактирования и обратно
  _replacePointToForm() {
    replace(this._eventEditComponent, this._eventComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToPoint() {
    replace(this._eventComponent, this._eventEditComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  // Обработчик нажатия клавиши Esc
  _escKeyDownHandler(evt) {
    if (evt.key === Key.ESC_KEY) {
      evt.preventDefault();
      this._eventEditComponent.reset(this._event); // выход без редактирования
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
    this._changeData(
        UserAction.UPDATE_EVENT,
        UpdateType.MINOR,
        Object.assign(
            {},
            this._event,
            {
              isFavorite: !this._event.isFavorite
            }
        )
    );
  }

  _handleFormSubmit(event) {
    this._changeData(
        UserAction.UPDATE_EVENT,
        UpdateType.MINOR,
        event);

    this._replaceFormToPoint();
  }
}
