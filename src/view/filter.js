import AbstractView from "./abstract.js";

const createFilterItemTemplate = (filter, isChecked) => {
  const {name} = filter;

  return `<div class="trip-filters__filter">
    <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}"
    ${isChecked ? `checked` : `disabled`}>
    <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
  </div>`;
};

const createFilterTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createFilterItemTemplate(filter, index === 0))
    .join(``);

  return `<div class="trip-controls__wrapper">
    <h2 class="visually-hidden">Filter events</h2>
    <form class="trip-filters" action="#" method="get">
      ${filterItemsTemplate}

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  </div>`;
};

export default class Filter extends AbstractView {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  _getTemplate() {
    return createFilterTemplate(this._filters);
  }
}
