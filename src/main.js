import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createFilterTemplate} from "./view/filter.js";
import {createTripInfoTemplate} from "./view/trip-info.js";
import {createTripCostTemplate} from "./view/trip-cost.js";
import {createSortTemplate} from "./view/sort.js";
import {createFormEditTemplate} from "./view/form-edit.js";
import {createFormAddTemplate} from "./view/form-add.js";
import {createTripEventsListTemplate} from "./view/events-list.js";
import {createTripEventTemplate} from "./view/trip-event.js";

import {generateEvent} from "./mock/trip-event.js";

// Точка маршрута отрисовывается в списке 20 раз
const EVENT_COUNT = 20;

const events = new Array(EVENT_COUNT).fill().map(generateEvent).sort((a, b) =>
  a.time.start - b.time.start);

const render = (container, template, position) => {
  container.insertAdjacentHTML(position, template);
};

// Информация о маршруте и стоимость поездки
const tripMainElement = document.querySelector(`.trip-main`);

render(tripMainElement, createTripInfoTemplate(), `afterbegin`);

const tripInfoElement = tripMainElement.querySelector(`.trip-info`);

render(tripInfoElement, createTripCostTemplate(), `beforeend`);

// Меню
const tripControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
render(tripControlsElement, createSiteMenuTemplate(), `afterbegin`);

// Фильтр
render(tripControlsElement, createFilterTemplate(), `beforeend`);

// Сортировка
const tripEventsElement = document.querySelector(`.trip-events`);

render(tripEventsElement, createSortTemplate(), `beforeend`);

// Список точек маршрута
render(tripEventsElement, createTripEventsListTemplate(), `beforeend`);

// Форма редактирования новой точки маршрута
const eventsListElement = tripEventsElement.querySelector(`.trip-events__list`);

render(eventsListElement, createFormEditTemplate(events[0]), `afterbegin`);

// Форма создания новой точки маршрута
const eventAddButton = tripMainElement.querySelector(`.trip-main__event-add-btn`);

const onEventAddButtonClick = function () {
  render(eventsListElement, createFormAddTemplate(events[0]), `afterbegin`);
};

eventAddButton.addEventListener(`click`, onEventAddButtonClick);

for (let i = 0; i < EVENT_COUNT; i++) {
  render(eventsListElement, createTripEventTemplate(events[i]), `beforeend`);
}
