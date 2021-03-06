import SiteMenuView from "./view/site-menu.js";
import InfoView from "./view/info.js";
import CostInfoView from "./view/cost-info.js";
import MainInfoView from "./view/main-info.js";

import {generateEvent} from "./mock/event.js";
import TripPresenter from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";
import EventsModel from "./model/events.js";
import FilterModel from "./model/filter.js";
import {render, RenderPosition} from "./utils/render.js";


const EVENT_COUNT = 20;

const events = new Array(EVENT_COUNT).fill().map(generateEvent);

const eventsModel = new EventsModel();
eventsModel.setEvents(events);

const filterModel = new FilterModel();

const tripMainElement = document.querySelector(`.trip-main`);
const tripEventsElement = document.querySelector(`.trip-events`);
const tripControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);

const tripPresenter = new TripPresenter(tripEventsElement, eventsModel, filterModel);

// Функция отрисовки информации о маршруте и стоимости поездки
const renderInfo = (infoContainer) => {
  const infoComponent = new InfoView();

  render(infoContainer, infoComponent, RenderPosition.AFTERBEGIN);
  render(infoComponent, new MainInfoView(), RenderPosition.AFTERBEGIN);
  render(infoComponent, new CostInfoView(), RenderPosition.BEFOREEND);
};

renderInfo(tripMainElement);

// Меню
render(tripControlsElement, new SiteMenuView(), RenderPosition.AFTERBEGIN);

// Фильтр
const filterPresenter = new FilterPresenter(tripControlsElement, filterModel);

filterPresenter.init();
tripPresenter.init();

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  tripPresenter.createNewEvent();
});
