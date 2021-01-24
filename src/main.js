import SiteMenuView from "./view/site-menu.js";
import FilterView from "./view/filter.js";
import InfoView from "./view/info.js";
import CostInfoView from "./view/cost-info.js";
import MainInfoView from "./view/main-info.js";

import {generateEvent} from "./mock/event.js";
import {generateFilter} from "./mock/filter.js";
import TripPresenter from "./presenter/trip.js";
import {render, RenderPosition} from "./utils/render.js";


const EVENT_COUNT = 20;

const events = new Array(EVENT_COUNT).fill().map(generateEvent).sort((a, b) =>
  a.startTime - b.startTime);
const filters = generateFilter();

const tripMainElement = document.querySelector(`.trip-main`);
const tripEventsElement = document.querySelector(`.trip-events`);
const tripControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);

const tripPresenter = new TripPresenter(tripEventsElement);

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
render(tripControlsElement, new FilterView(filters), RenderPosition.BEFOREEND);

tripPresenter.init(events);
