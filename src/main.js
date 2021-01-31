import SiteMenuView from "./view/site-menu.js";
import InfoView from "./view/info.js";
import StatisticsView from "./view/statistics.js";
import CostInfoView from "./view/cost-info.js";
import MainInfoView from "./view/main-info.js";

import {generateEvent} from "./mock/event.js";
import TripPresenter from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";
import EventsModel from "./model/events.js";
import FilterModel from "./model/filter.js";
import {render, RenderPosition, remove} from "./utils/render.js";
import {MenuItem, UpdateType, FilterType} from "./constants.js";


const EVENT_COUNT = 20;

const events = new Array(EVENT_COUNT).fill().map(generateEvent);

const eventsModel = new EventsModel();
eventsModel.setEvents(events);

const filterModel = new FilterModel();

const tripMainElement = document.querySelector(`.trip-main`);
const tripEventsElement = document.querySelector(`.trip-events`);
const tripControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);

const siteMenuComponent = new SiteMenuView();

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
render(tripControlsElement, siteMenuComponent, RenderPosition.BEFOREEND);

// Фильтр
const filterPresenter = new FilterPresenter(tripControlsElement, filterModel);

let statisticsComponent = null;

statisticsComponent = new StatisticsView(eventsModel.getEvents());

//  const handleEventNewFormClose = () => {
//  siteMenuComponent.getElement().querySelector(`[value=${MenuItem.TABLE}]`).disabled = false;
//  siteMenuComponent.setMenuItem(MenuItem.TABLE);
//  };

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case menuItem.TABLE:
      remove(statisticsComponent);
      tripPresenter.init();
      siteMenuComponent.setMenuItem(MenuItem.TABLE);
      break;
    case MenuItem.STATS:
      tripPresenter.destroy();
      // statisticsComponent = new StatisticsView(eventsModel.getEvents());
      render(tripEventsElement, statisticsComponent, RenderPosition.AFTEREND);
      siteMenuComponent.setMenuItem(MenuItem.STATS);
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

filterPresenter.init();
tripPresenter.init();

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  remove(statisticsComponent);
  tripPresenter.destroy();
  filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
  tripPresenter.init();
  tripPresenter.createNewEvent();
});
