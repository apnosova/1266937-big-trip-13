import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createFilterTemplate} from "./view/filter.js";
import {createTripInfoTemplate} from "./view/trip-info.js";
import {createTripCostTemplate} from "./view/trip-cost.js";
import {createSortTemplate} from "./view/sort.js";
import {createFormEditTemplate} from "./view/form-edit.js";
import {createFormAddTemplate} from "./view/form-add.js";
import {createTripPointTemplate} from "./view/trip-point.js";

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
const titleElement = tripControlsElement.querySelectorAll(`h2`);
render(titleElement[0], createSiteMenuTemplate(), `afterend`);

// Фильтр
render(titleElement[1], createFilterTemplate(), `afterend`);

// Сортировка
const tripEventsElement = document.querySelector(`.trip-events`);

render(tripEventsElement, createSortTemplate(), `beforeend`);

// Форма редактирования
render(tripEventsElement, createFormEditTemplate(), `beforeend`);

// Форма создания
const eventsListElement = tripEventsElement.querySelector(`.trip-events__list`);

render(eventsListElement, createFormAddTemplate(), `beforeend`);

// Точка маршрута отрисовывается в списке 3 раза
const POINT_COUNT = 3;

for (let i = 0; i < POINT_COUNT; i++) {
  render(eventsListElement, createTripPointTemplate(), `beforeend`);
}
