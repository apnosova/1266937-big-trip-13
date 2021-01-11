import SiteMenuView from "./view/site-menu.js";
import FilterView from "./view/filter.js";
import InfoView from "./view/info.js";
import CostInfoView from "./view/cost-info.js";
import MainInfoView from "./view/main-info.js";
import SortView from "./view/sort.js";
import EventEditView from "./view/event-edit.js";
import EventView from "./view/event.js";
import EventListView from "./view/event-list.js";
import {generateEvent} from "./mock/event.js";
import {generateFilter} from "./mock/filter.js";
import {render, RenderPosition} from "./utils.js";


const EVENT_COUNT = 20;

const events = new Array(EVENT_COUNT).fill().map(generateEvent).sort((a, b) =>
  a.time.start - b.time.start);

const filters = generateFilter();

// Замена точки маршрута на форму редактирования и обратно
const renderEvent = (eventListElement, event) => {
  const eventComponent = new EventView(event);
  const eventEditComponent = new EventEditView(event);

  const replacePointToForm = () => {
    eventListElement.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const replaceFormToPoint = () => {
    eventListElement.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  eventComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replacePointToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceFormToPoint();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToPoint();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(eventListElement, eventComponent.getElement(), RenderPosition.BEFOREEND);
};

// Информация о маршруте и стоимость поездки
const tripMainElement = document.querySelector(`.trip-main`);

const infoComponent = new InfoView();

render(tripMainElement, infoComponent.getElement(), RenderPosition.AFTERBEGIN);

render(infoComponent.getElement(), new MainInfoView().getElement(), RenderPosition.AFTERBEGIN);

render(infoComponent.getElement(), new CostInfoView().getElement(), RenderPosition.BEFOREEND);

// Меню
const tripControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);

render(tripControlsElement, new SiteMenuView().getElement(), RenderPosition.AFTERBEGIN);

// Фильтр
render(tripControlsElement, new FilterView(filters).getElement(), RenderPosition.BEFOREEND);

// Сортировка
const tripEventsElement = document.querySelector(`.trip-events`);

render(tripEventsElement, new SortView().getElement(), RenderPosition.BEFOREEND);

// Список точек маршрута
const eventListComponent = new EventListView();

render(tripEventsElement, eventListComponent.getElement(), RenderPosition.BEFOREEND);

// Точка маршрута отрисовывается в списке 20 раз
for (let i = 0; i < EVENT_COUNT; i++) {
  renderEvent(eventListComponent.getElement(), events[i]);
}
