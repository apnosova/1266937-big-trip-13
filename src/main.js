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
import {render, RenderPosition} from "./utils.js";


const EVENT_COUNT = 20;

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
    eventListElement.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const replaceFormToPoint = () => {
    eventListElement.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  // Обработчик нажатия клавиши Esc
  const escKeyDownHandler = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
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

  render(eventListElement, eventComponent.getElement(), RenderPosition.BEFOREEND);
};


// Функция отрисовки информации о маршруте и стоимости поездки
const renderInfo = (infoContainer) => {
  const infoComponent = new InfoView();

  render(infoContainer, infoComponent.getElement(), RenderPosition.AFTERBEGIN);
  render(infoComponent.getElement(), new MainInfoView().getElement(), RenderPosition.AFTERBEGIN);
  render(infoComponent.getElement(), new CostInfoView().getElement(), RenderPosition.BEFOREEND);
};

renderInfo(tripMainElement);


// Функция отрисовки таблицы со списком точек маршрута и сортировкой
const renderTable = (tableContainer, tableEvents) => {
  const eventListComponent = new EventListView();

  // В случае отсутствия точек маршрута вместо списка отображается заглушка
  if (tableEvents.length === 0) {
    render(tableContainer, new NoEventView().getElement(), RenderPosition.BEFOREEND);
    return;
  }

  render(tableContainer, new SortView().getElement(), RenderPosition.BEFOREEND);
  render(tableContainer, eventListComponent.getElement(), RenderPosition.BEFOREEND);

  tableEvents.forEach((tableEvent) => renderEvent(eventListComponent.getElement(), tableEvent));
};


// Меню
render(tripControlsElement, new SiteMenuView().getElement(), RenderPosition.AFTERBEGIN);

// Фильтр
render(tripControlsElement, new FilterView(filters).getElement(), RenderPosition.BEFOREEND);

renderTable(tripEventsElement, events);
