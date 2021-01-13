import SiteMenuView from "./view/site-menu.js";
import FilterView from "./view/filter.js";
import InfoView from "./view/info.js";
import CostInfoView from "./view/cost-info.js";
import MainInfoView from "./view/main-info.js";
import SortView from "./view/sort.js";
import EventEditView from "./view/event-edit.js";
import EventView from "./view/event.js";
import EventListView from "./view/event-list.js";
import NoEventView from "./view/no-event.js";
import {generateEvent} from "./mock/event.js";
import {generateFilter} from "./mock/filter.js";
import {render, RenderPosition, replace} from "./utils/render.js";


const EVENT_COUNT = 20;

const Key = {
  ESC_KEY: `Escape` || `Esc`,
  ENTER_KEY: `Enter`,
};


const events = new Array(EVENT_COUNT).fill().map(generateEvent).sort((a, b) =>
  a.time.start - b.time.start);
const filters = generateFilter();

const tripMainElement = document.querySelector(`.trip-main`);
const tripEventsElement = document.querySelector(`.trip-events`);
const tripControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);


// Замена точки маршрута на форму редактирования и обратно
const renderEvent = (eventListElement, event) => {
  const eventComponent = new EventView(event);
  const eventEditComponent = new EventEditView(event);

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

  eventComponent.setUnrollBtnClickHandler(() => {
    replacePointToForm();
    document.addEventListener(`keydown`, escKeyDownHandler);
  });

  // Закрытие формы редактирования по стрелке вверх
  eventEditComponent.setRollupBtnClickHandler(() => {
    replaceFormToPoint();
    document.removeEventListener(`keydown`, escKeyDownHandler);
  });

  eventEditComponent.setFormSubmitHandler(() => {
    replaceFormToPoint();
    document.removeEventListener(`keydown`, escKeyDownHandler);
  });

  render(eventListElement, eventComponent, RenderPosition.BEFOREEND);
};


// Функция отрисовки информации о маршруте и стоимости поездки
const renderInfo = (infoContainer) => {
  const infoComponent = new InfoView();

  render(infoContainer, infoComponent, RenderPosition.AFTERBEGIN);
  render(infoComponent, new MainInfoView(), RenderPosition.AFTERBEGIN);
  render(infoComponent, new CostInfoView(), RenderPosition.BEFOREEND);
};

renderInfo(tripMainElement);


// Функция отрисовки таблицы со списком точек маршрута и сортировкой
const renderTable = (tableContainer, tableEvents) => {
  const eventListComponent = new EventListView();

  // В случае отсутствия точек маршрута вместо списка отображается заглушка
  if (tableEvents.length === 0) {
    render(tableContainer, new NoEventView(), RenderPosition.BEFOREEND);
    return;
  }

  render(tableContainer, new SortView(), RenderPosition.BEFOREEND);
  render(tableContainer, eventListComponent, RenderPosition.BEFOREEND);

  tableEvents.forEach((tableEvent) => renderEvent(eventListComponent, tableEvent));
};


// Меню
render(tripControlsElement, new SiteMenuView(), RenderPosition.AFTERBEGIN);

// Фильтр
render(tripControlsElement, new FilterView(filters), RenderPosition.BEFOREEND);

renderTable(tripEventsElement, events);
